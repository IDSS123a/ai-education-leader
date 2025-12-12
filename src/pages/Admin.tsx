import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, RefreshCw, Shield, Mail, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CVRequest {
  id: string;
  token: string;
  email: string;
  name: string | null;
  status: string;
  created_at: string;
  processed_at: string | null;
}

export default function Admin() {
  const [requests, setRequests] = useState<CVRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cv_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (token: string, action: "approve" | "reject") => {
    setProcessing(token);
    try {
      const { error } = await supabase
        .from("cv_requests")
        .update({ 
          status: action === "approve" ? "approved" : "rejected",
          processed_at: new Date().toISOString()
        })
        .eq("token", token);

      if (error) throw error;

      toast({
        title: action === "approve" ? "Approved!" : "Rejected",
        description: `Request has been ${action === "approve" ? "approved" : "rejected"}.`,
      });

      fetchRequests();
    } catch (error: any) {
      console.error("Error processing request:", error);
      toast({
        title: "Error",
        description: "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingRequests = requests.filter(r => r.status === "pending");
  const processedRequests = requests.filter(r => r.status !== "pending");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              CV Request Admin
            </h1>
            <Button variant="outline" size="sm" onClick={fetchRequests} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <p className="text-muted-foreground">Manage CV download requests</p>
        </motion.div>

        {/* Pending Requests */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Pending Requests ({pendingRequests.length})
          </h2>
          
          {loading ? (
            <Card className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Loading...</p>
            </Card>
          ) : pendingRequests.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <p className="text-muted-foreground">No pending requests</p>
            </Card>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {pendingRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    layout
                  >
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(request.status)}
                          </div>
                          <div className="space-y-1">
                            <p className="flex items-center gap-2 text-foreground">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{request.email}</span>
                            </p>
                            {request.name && (
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <User className="w-4 h-4" />
                                {request.name}
                              </p>
                            )}
                            <p className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Calendar className="w-4 h-4" />
                              {new Date(request.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAction(request.token, "approve")}
                            disabled={processing === request.token}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleAction(request.token, "reject")}
                            disabled={processing === request.token}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Processed Requests */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-muted-foreground" />
            History ({processedRequests.length})
          </h2>
          
          {processedRequests.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No processed requests yet</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {processedRequests.map((request) => (
                <Card key={request.id} className="p-4 opacity-75">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusBadge(request.status)}
                        <span className="text-sm text-muted-foreground">
                          {request.processed_at && new Date(request.processed_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-foreground">{request.email}</p>
                      {request.name && <p className="text-sm text-muted-foreground">{request.name}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
