 import { useState, useEffect } from "react";
 import { useNavigate, Link } from "react-router-dom";
 import { motion } from "framer-motion";
 import { Shield, Mail, Lock, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Card } from "@/components/ui/card";
 import { Alert, AlertDescription } from "@/components/ui/alert";
 import { useAuth } from "@/hooks/useAuth";
 import { loginSchema } from "@/lib/validation";
 import { z } from "zod";
 
 export default function Auth() {
   const navigate = useNavigate();
   const { user, isAdmin, signIn, loading: authLoading } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   // Redirect if already logged in as admin
   useEffect(() => {
     if (user && isAdmin) {
       navigate("/admin");
     }
   }, [user, isAdmin, navigate]);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError(null);
 
     // Validate input
     try {
       loginSchema.parse({ email, password });
     } catch (err) {
       if (err instanceof z.ZodError) {
         setError(err.errors[0].message);
         return;
       }
     }
 
     setLoading(true);
 
     try {
       const { error: signInError } = await signIn(email, password);
 
       if (signInError) {
         if (signInError.message.includes("Invalid login credentials")) {
           setError("Invalid email or password");
         } else if (signInError.message.includes("Email not confirmed")) {
           setError("Please verify your email address");
         } else {
           setError(signInError.message);
         }
         return;
       }
 
       // Success - redirect will happen via useEffect when isAdmin updates
     } catch (err) {
       setError("An unexpected error occurred. Please try again.");
     } finally {
       setLoading(false);
     }
   };
 
   if (authLoading) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
     );
   }
 
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
           <div className="flex justify-center mb-4">
             <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
               <Shield className="w-8 h-8 text-primary" />
             </div>
           </div>
           <h1 className="text-3xl font-bold text-foreground mb-2">Admin Login</h1>
           <p className="text-muted-foreground">
             Secure access to the administration panel
           </p>
         </motion.div>
 
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
         >
           <Card className="p-6">
             {error && (
               <Alert variant="destructive" className="mb-4">
                 <AlertCircle className="h-4 w-4" />
                 <AlertDescription>{error}</AlertDescription>
               </Alert>
             )}
 
             <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="email">Email</Label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <Input
                     id="email"
                     type="email"
                     placeholder="admin@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="pl-10"
                     disabled={loading}
                     autoComplete="email"
                   />
                 </div>
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="password">Password</Label>
                 <div className="relative">
                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <Input
                     id="password"
                     type="password"
                     placeholder="••••••••"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="pl-10"
                     disabled={loading}
                     autoComplete="current-password"
                   />
                 </div>
               </div>
 
               <Button type="submit" className="w-full" disabled={loading}>
                 {loading ? (
                   <>
                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                     Signing in...
                   </>
                 ) : (
                   <>
                     <Shield className="w-4 h-4 mr-2" />
                     Sign In
                   </>
                 )}
               </Button>
             </form>
 
             <p className="text-xs text-muted-foreground mt-4 text-center">
               This is a secure admin-only area. Unauthorized access attempts are logged.
             </p>
           </Card>
         </motion.div>
       </div>
     </div>
   );
 }