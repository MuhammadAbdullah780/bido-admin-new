"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful password reset request
      setIsSubmitted(true);
      
    } catch (error) {
      setErrors({ general: "Failed to send reset email. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle resend logic here
      console.log("Resending email to:", email);
    } catch (error) {
      setErrors({ general: "Failed to resend email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to login link */}
          <div className="mb-6">
            <Link 
              href="/login" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>

          {/* Success Card */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
              <CardDescription>
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-blue-800 dark:text-blue-200 font-medium">
                        Didn't receive the email?
                      </p>
                      <p className="text-blue-700 dark:text-blue-300 mt-1">
                        Check your spam folder or try resending the email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin mr-2" />
                      Resending...
                    </>
                  ) : (
                    "Resend email"
                  )}
                </Button>
                
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/login">
                    Back to login
                  </Link>
                </Button>
              </div>

              {errors.general && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {errors.general}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Scrabia Admin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login link */}
        <div className="mb-6">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>

        {/* Forgot Password Card */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Forgot your password?</CardTitle>
            <CardDescription>
              No worries! Enter your email address and we'll send you a reset link.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error */}
              {errors.general && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {errors.general}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Scrabia Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
