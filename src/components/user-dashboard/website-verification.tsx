"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { VerificationCard } from "@/components/dashboard/verification-card";
import {
  Globe,
  FileText,
  Code,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export function WebsiteVerification() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("dns");
  const [verificationStep, setVerificationStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [copiedDns, setCopiedDns] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl) {
      setVerificationStep(2);
    }
  };

  const handleVerificationMethodChange = (value: string) => {
    setVerificationMethod(value);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setVerificationStep(3);
    }, 2000);
  };

  const copyToClipboard = (text: string, type: "dns" | "html") => {
    navigator.clipboard.writeText(text);
    if (type === "dns") {
      setCopiedDns(true);
      setTimeout(() => setCopiedDns(false), 2000);
    } else {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  const resetVerification = () => {
    setWebsiteUrl("");
    setVerificationMethod("dns");
    setVerificationStep(1);
    setVerificationSuccess(false);
  };

  const dnsTxtRecord = "securesco-verification=abc123def456";
  const htmlFileContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>SecureSEO Verification</title>\n</head>\n<body>\n  <!-- SecureSEO Verification Token -->\n  <meta name="securesco-verification" content="abc123def456">\n</body>\n</html>`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Step 1: Enter Website URL */}
          {verificationStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Verify Website Ownership</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      To scan and analyze your website, we need to verify that
                      you own it. Enter your website URL below to get started.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    placeholder="https://example.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the full URL including http:// or https://
                  </p>
                </div>
                <Button type="submit" disabled={!websiteUrl}>
                  Continue
                </Button>
              </form>

              <div className="grid gap-4 md:grid-cols-3">
                <VerificationCard
                  icon={<Globe className="h-8 w-8 text-primary" />}
                  title="DNS Verification"
                  description="Add a TXT record to your domain's DNS settings"
                />
                <VerificationCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="HTML File Verification"
                  description="Upload an HTML file to your website's root directory"
                />
                <VerificationCard
                  icon={<Code className="h-8 w-8 text-primary" />}
                  title="HTML Tag Verification"
                  description="Add a meta tag to your website's home page"
                />
              </div>
            </div>
          )}

          {/* Step 2: Choose Verification Method */}
          {verificationStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Verify {websiteUrl}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose one of the verification methods below to prove
                      ownership of your website.
                    </p>
                  </div>
                </div>
              </div>

              <Tabs
                value={verificationMethod}
                onValueChange={handleVerificationMethodChange}
                className="space-y-4"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dns">DNS</TabsTrigger>
                  <TabsTrigger value="html-file">HTML File</TabsTrigger>
                  <TabsTrigger value="meta-tag">Meta Tag</TabsTrigger>
                </TabsList>

                <TabsContent value="dns" className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">
                      DNS TXT Record Verification
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add the following TXT record to your domain's DNS
                      settings:
                    </p>

                    <div className="space-y-2">
                      <Label>Host/Name</Label>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <code className="text-sm">@</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7"
                          onClick={() => copyToClipboard("@", "dns")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>TXT Value</Label>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <code className="text-sm break-all">
                          {dnsTxtRecord}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 whitespace-nowrap ml-2"
                          onClick={() => copyToClipboard(dnsTxtRecord, "dns")}
                        >
                          {copiedDns ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        DNS changes can take up to 24-48 hours to propagate.
                        Once you've added the TXT record, click the button below
                        to verify.
                      </p>
                      <Button
                        onClick={handleVerify}
                        disabled={isVerifying}
                        className="w-full"
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify DNS Record"
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          Need help with DNS settings?
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Check out our guides for popular domain providers:
                        </p>
                        <div className="mt-2 space-y-1">
                          <Button variant="link" className="h-auto p-0 text-sm">
                            GoDaddy DNS Settings Guide
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                          <Button variant="link" className="h-auto p-0 text-sm">
                            Namecheap DNS Settings Guide
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                          <Button variant="link" className="h-auto p-0 text-sm">
                            Cloudflare DNS Settings Guide
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="html-file" className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">HTML File Verification</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download the verification file and upload it to your
                      website's root directory:
                    </p>

                    <div className="space-y-2">
                      <Label>File Name</Label>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <code className="text-sm">
                          securesco-verification.html
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7"
                          onClick={() =>
                            copyToClipboard(
                              "securesco-verification.html",
                              "html",
                            )
                          }
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>File Content</Label>
                      <div className="relative">
                        <pre className="p-2 bg-muted rounded-md text-xs overflow-x-auto">
                          {htmlFileContent}
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-7"
                          onClick={() =>
                            copyToClipboard(htmlFileContent, "html")
                          }
                        >
                          {copiedHtml ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Upload this file to your website's root directory so
                        it's accessible at: {websiteUrl}
                        /securesco-verification.html
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Download File
                        </Button>
                        <Button
                          onClick={handleVerify}
                          disabled={isVerifying}
                          className="flex-1"
                        >
                          {isVerifying ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            "Verify File"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="meta-tag" className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Meta Tag Verification</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add the following meta tag to the{" "}
                      <code>&lt;head&gt;</code> section of your website's home
                      page:
                    </p>

                    <div className="space-y-2">
                      <Label>Meta Tag</Label>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <code className="text-sm break-all">
                          &lt;meta name="securesco-verification"
                          content="abc123def456"&gt;
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 whitespace-nowrap ml-2"
                          onClick={() =>
                            copyToClipboard(
                              '<meta name="securesco-verification" content="abc123def456">',
                              "html",
                            )
                          }
                        >
                          {copiedHtml ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        After adding the meta tag to your website's home page,
                        click the button below to verify.
                      </p>
                      <Button
                        onClick={handleVerify}
                        disabled={isVerifying}
                        className="w-full"
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify Meta Tag"
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setVerificationStep(1)}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Verification Success */}
          {verificationStep === 3 && (
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-muted/50 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">
                  Verification Successful!
                </h3>
                <p className="text-muted-foreground">
                  {websiteUrl} has been successfully verified. You can now run
                  security and SEO scans on this website.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button>Run Security Scan</Button>
                  <Button variant="outline">Run SEO Analysis</Button>
                  <Button variant="outline">Go to Dashboard</Button>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="link" onClick={resetVerification}>
                  Verify Another Website
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
