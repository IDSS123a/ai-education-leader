import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RefreshCw, Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MetricRow {
  id: string;
  function_name: string;
  recipient_hash: string | null;
  idempotency_key: string | null;
  status: string;
  attempts: number;
  total_latency_ms: number | null;
  last_error_code: string | null;
  last_error_message: string | null;
  attempt_log: Array<{ attempt: number; status: number | null; ms: number; reason?: string }>;
  created_at: string;
}

const TIME_RANGES = [
  { label: "Last 1 hour", value: "1h" },
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "All time", value: "all" },
];

function rangeToDate(r: string): Date | null {
  const now = Date.now();
  switch (r) {
    case "1h": return new Date(now - 60 * 60 * 1000);
    case "24h": return new Date(now - 24 * 60 * 60 * 1000);
    case "7d": return new Date(now - 7 * 24 * 60 * 60 * 1000);
    default: return null;
  }
}

export function EmailMetricsViewer() {
  const [rows, setRows] = useState<MetricRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [fnFilter, setFnFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  const [search, setSearch] = useState("");

  const fetchMetrics = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("email_send_metrics")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error) setRows((data as MetricRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const functions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.function_name))).sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const fromDate = rangeToDate(timeRange);
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (fnFilter !== "all" && r.function_name !== fnFilter) return false;
      if (fromDate && new Date(r.created_at) < fromDate) return false;
      if (q) {
        const hay = [r.function_name, r.idempotency_key ?? "", r.last_error_message ?? ""].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusFilter, fnFilter, timeRange, search]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const sent = filtered.filter((r) => r.status === "sent").length;
    const failed = total - sent;
    const retries = filtered.filter((r) => r.attempts > 1).length;
    const avgLatency = total
      ? Math.round(filtered.reduce((a, r) => a + (r.total_latency_ms ?? 0), 0) / total)
      : 0;
    const errorRate = total ? Math.round((failed / total) * 1000) / 10 : 0;
    return { total, sent, failed, retries, avgLatency, errorRate };
  }, [filtered]);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="p-3"><div className="text-xs text-muted-foreground">Total</div><div className="text-2xl font-bold">{stats.total}</div></Card>
        <Card className="p-3"><div className="text-xs text-muted-foreground">Sent</div><div className="text-2xl font-bold text-green-600">{stats.sent}</div></Card>
        <Card className="p-3"><div className="text-xs text-muted-foreground">Failed</div><div className="text-2xl font-bold text-red-600">{stats.failed}</div></Card>
        <Card className="p-3"><div className="text-xs text-muted-foreground">Retries</div><div className="text-2xl font-bold text-yellow-600">{stats.retries}</div></Card>
        <Card className="p-3"><div className="text-xs text-muted-foreground">Avg latency</div><div className="text-2xl font-bold">{stats.avgLatency} ms</div></Card>
      </div>
      <Card className="p-3">
        <div className="text-xs text-muted-foreground">Error rate: <span className={stats.errorRate === 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{stats.errorRate}%</span></div>
      </Card>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1"><Filter className="w-3 h-3" /> Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1"><Filter className="w-3 h-3" /> Function</Label>
            <Select value={fnFilter} onValueChange={setFnFilter}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {functions.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Time</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1"><Search className="w-3 h-3" /> Search</Label>
            <Input placeholder="error / key / function…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="mt-3">
          <Button size="sm" variant="outline" onClick={fetchMetrics} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </Card>

      {loading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading…</Card>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">No email metrics match your filters</Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
            <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {r.status === "sent" ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" /> Sent
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">
                        <XCircle className="w-3 h-3 mr-1" /> Failed
                      </Badge>
                    )}
                    <span className="font-mono text-xs">{r.function_name}</span>
                    <Badge variant="outline">{r.attempts} attempt{r.attempts === 1 ? "" : "s"}</Badge>
                    <span className="text-xs text-muted-foreground">{r.total_latency_ms} ms</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                </div>
                {r.last_error_message && (
                  <p className="mt-1 text-xs text-red-600">{r.last_error_code}: {r.last_error_message}</p>
                )}
                {r.attempt_log?.length > 1 && (
                  <details className="mt-1 text-xs text-muted-foreground">
                    <summary className="cursor-pointer">Attempt log</summary>
                    <ul className="mt-1 space-y-0.5 font-mono">
                      {r.attempt_log.map((a, i) => (
                        <li key={i}>#{a.attempt} → {a.status ?? "ERR"} ({a.ms} ms){a.reason ? ` — ${a.reason}` : ""}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
