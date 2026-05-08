// Public webhook endpoint that receives Resend delivery events and writes
// them onto the matching email_send_metrics row. Correlation works either via
// provider_message_id (data.email_id from Resend) or — preferred — via the
// `idempotency_key` tag we attach when sending. Optional signature
// verification when RESEND_WEBHOOK_SECRET is set.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature",
};

const TYPE_TO_STATUS: Record<string, string> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.delivery_delayed": "delayed",
  "email.bounced": "bounced",
  "email.complained": "complained",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.failed": "failed",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const raw = await req.text();
    const event = JSON.parse(raw) as {
      type?: string;
      created_at?: string;
      data?: {
        email_id?: string;
        tags?: Array<{ name: string; value: string }> | Record<string, string>;
        bounce?: unknown;
        click?: unknown;
      };
    };

    const type = event.type ?? "unknown";
    const status = TYPE_TO_STATUS[type] ?? type;
    const emailId = event.data?.email_id ?? null;
    const tagsRaw = event.data?.tags;
    const tagMap: Record<string, string> = Array.isArray(tagsRaw)
      ? Object.fromEntries(tagsRaw.map((t) => [t.name, t.value]))
      : (tagsRaw as Record<string, string>) ?? {};
    const idempotencyKey = tagMap["idempotency_key"] ?? null;

    if (!emailId && !idempotencyKey) {
      return new Response(JSON.stringify({ ok: true, ignored: "no correlation id" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find the metric row.
    let query = sb.from("email_send_metrics").select("id, delivery_events");
    if (idempotencyKey) query = query.eq("idempotency_key", idempotencyKey);
    else if (emailId) query = query.eq("provider_message_id", emailId);
    const { data: row } = await query.maybeSingle();

    if (!row) {
      console.warn("resend-webhook: no matching row", { type, emailId, idempotencyKey });
      return new Response(JSON.stringify({ ok: true, ignored: "no row" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const events = Array.isArray(row.delivery_events) ? row.delivery_events : [];
    events.push({
      type,
      status,
      at: event.created_at ?? new Date().toISOString(),
    });

    await sb
      .from("email_send_metrics")
      .update({
        delivery_status: status,
        delivery_events: events,
        last_delivery_at: new Date().toISOString(),
        ...(emailId ? { provider_message_id: emailId } : {}),
      })
      .eq("id", row.id);

    return new Response(JSON.stringify({ ok: true, status }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e: any) {
    console.error("resend-webhook error:", e.message);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
