import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Clock, Download, ArrowLeft, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function CVStatus() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    found: boolean;
    status?: string;
    name?: string | null;
    created_at?: string;
  } | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const { data, error } = await supabase
        .from("cv_requests")
        .select("status, name, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setStatus({ found: true, ...data });
      } else {
        setStatus({ found: false });
      }
    } catch (error: any) {
      console.error("Error checking status:", error);
      toast({
        title: "Error",
        description: "Failed to check status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = () => {
    if (!status) return null;

    if (!status.found) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6"
        >
          <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Request Found</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any CV request with this email address.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </motion.div>
      );
    }

    switch (status.status) {
      case "pending":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6"
          >
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Request Pending</h3>
            <p className="text-muted-foreground mb-4">
              Your request is still being reviewed. Please check back later.
            </p>
            <p className="text-sm text-muted-foreground">
              Submitted: {new Date(status.created_at!).toLocaleString()}
            </p>
          </motion.div>
        );

      case "approved":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-green-600">Request Approved!</h3>
            <p className="text-muted-foreground mb-6">
              Your request has been approved. You can now download the CV.
            </p>
            <a 
              href="/Davor_Mulalic_CV.pdf" 
              download
              className="inline-block"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </a>
          </motion.div>
        );

      case "rejected":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6"
          >
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-red-600">Request Declined</h3>
            <p className="text-muted-foreground mb-4">
              Unfortunately, your request was not approved at this time.
            </p>
            <p className="text-sm text-muted-foreground">
              If you believe this was a mistake, please contact directly via email.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-block mb-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Check CV Request Status</h1>
          <p className="text-muted-foreground">
            Enter your email to check if your CV download request was approved.
          </p>
        </motion.div>

        <Card className="p-6">
          <form onSubmit={handleCheck} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Check Status
                </>
              )}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t"
              >
                {getStatusDisplay()}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
