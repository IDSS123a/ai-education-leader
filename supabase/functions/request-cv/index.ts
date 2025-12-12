import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CVRequestBody {
  email: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("CV request function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: CVRequestBody = await req.json();
    console.log("Received CV request from:", email);

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert CV request
    const { data: cvRequest, error: insertError } = await supabase
      .from("cv_requests")
      .insert({ email, name })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting CV request:", insertError);
      throw insertError;
    }

    console.log("CV request created:", cvRequest.id);

    return new Response(
      JSON.stringify({ success: true, message: "Request submitted successfully", token: cvRequest.token }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in request-cv function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
