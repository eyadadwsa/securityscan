"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Fingerprint,
  KeyRound,
  Mail,
  Shield,
  Smartphone,
} from "lucide-react";

export function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<
    "password" | "2fa" | "biometric" | "social"
  >("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Simulate authentication
      if (authMethod === "password") {
        // Basic email/password auth
        if (email && password) {
          // In a real app, this would call an API
          setTimeout(() => {
            if (email === "demo@example.com" && password === "password") {
              setShowTwoFactor(true);
            } else {
              setError("Invalid email or password");
              setIsLoading(false);
            }
          }, 1000);
        } else {
          setError("Please enter both email and password");
          setIsLoading(false);
        }
      } else if (authMethod === "2fa" && showTwoFactor) {
        // Verify 2FA code
        if (verificationCode) {
          // In a real app, this would verify the code
          setTimeout(() => {
            if (verificationCode === "123456") {
              router.push("/dashboard");
            } else {
              setError("Invalid verification code");
              setIsLoading(false);
            }
          }, 1000);
        } else {
          setError("Please enter verification code");
          setIsLoading(false);
        }
      } else if (authMethod === "biometric") {
        // Simulate biometric auth
        setTimeout(() => {
          // In a real app, this would use the Web Authentication API
          router.push("/dashboard");
        }, 1500);
      } else if (authMethod === "social") {
        // Simulate social login
        // In a real app, this would redirect to OAuth provider
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred during authentication");
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = () => {
    setAuthMethod("biometric");
    setIsLoading(true);
    setError(null);

    // Simulate biometric authentication
    setTimeout(() => {
      // In a real app, this would use the Web Authentication API
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Choose your preferred authentication method
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!showTwoFactor ? (
          <>
            <Tabs defaultValue="credentials" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="credentials"
                  onClick={() => setAuthMethod("password")}
                  className="flex flex-col items-center gap-1 py-2 h-auto"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-xs">Email</span>
                </TabsTrigger>
                <TabsTrigger
                  value="2fa"
                  onClick={() => setAuthMethod("2fa")}
                  className="flex flex-col items-center gap-1 py-2 h-auto"
                >
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">2FA</span>
                </TabsTrigger>
                <TabsTrigger
                  value="biometric"
                  onClick={() => setAuthMethod("biometric")}
                  className="flex flex-col items-center gap-1 py-2 h-auto"
                >
                  <Fingerprint className="h-4 w-4" />
                  <span className="text-xs">Biometric</span>
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  onClick={() => setAuthMethod("social")}
                  className="flex flex-col items-center gap-1 py-2 h-auto"
                >
                  <KeyRound className="h-4 w-4" />
                  <span className="text-xs">Social</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="credentials" className="mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="p-0 h-auto text-xs">
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
                    </Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="2fa" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sign in with your email and password first, then
                          you'll be prompted for a verification code.
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-2fa">Email</Label>
                      <Input
                        id="email-2fa"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-2fa">Password</Label>
                      <Input
                        id="password-2fa"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Continue to Verification"}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="biometric" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div className="flex items-start gap-3">
                      <Fingerprint className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          Biometric Authentication
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Use your fingerprint, face recognition, or other
                          biometric method to sign in securely.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 border rounded-md">
                    <Fingerprint className="h-16 w-16 text-primary mb-4" />
                    <p className="text-sm text-center mb-4">
                      Click the button below to authenticate using your device's
                      biometric sensor.
                    </p>
                    <Button onClick={handleBiometricAuth} disabled={isLoading}>
                      {isLoading
                        ? "Authenticating..."
                        : "Authenticate with Biometrics"}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div className="flex items-start gap-3">
                      <KeyRound className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Social Login</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sign in using one of your social media accounts for
                          quick and easy access.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => handleLogin}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Sign in with Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => handleLogin}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.217.682-.48 0-.236-.008-.864-.013-1.695-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Sign in with GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => handleLogin}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Sign in with Facebook
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 h-auto">
                  Sign up
                </Button>
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the verification code sent to your device or generated
                    by your authenticator app.
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={isLoading}
                  required
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setShowTwoFactor(false)}
                disabled={isLoading}
              >
                Back to Sign In
              </Button>
            </form>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Button variant="link" className="p-0 h-auto text-xs">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-xs">
            Privacy Policy
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
