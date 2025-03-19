import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileText, Globe, Link2 } from "lucide-react";

interface VerificationCardProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  isVerified?: boolean;
  domain?: string;
  onVerify?: () => void;
}

const VerificationCard = ({
  icon,
  title,
  description,
  isVerified = false,
  domain = "example.com",
  onVerify = () => {},
}: VerificationCardProps) => {
  // If icon, title, and description are provided, render the simple card version
  if (icon && title && description) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
            <h3 className="font-medium mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Otherwise render the full verification card
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe size={18} />
          Site Verification
        </CardTitle>
        <CardDescription>
          {isVerified
            ? `Your site ${domain} is verified`
            : "Verify ownership of your website to enable scanning"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isVerified ? (
          <div className="flex items-center gap-2 p-4 bg-green-500/10 text-green-500 rounded-md">
            <Link2 size={18} />
            <span>Your site is verified and ready for scanning</span>
          </div>
        ) : (
          <Tabs defaultValue="dns">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dns">DNS Record</TabsTrigger>
              <TabsTrigger value="file">HTML File</TabsTrigger>
              <TabsTrigger value="meta">Meta Tag</TabsTrigger>
            </TabsList>
            <TabsContent value="dns" className="space-y-4">
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    1. Add this TXT record to your DNS configuration:
                  </p>
                  <div className="p-3 bg-muted rounded-md font-mono text-xs overflow-x-auto">
                    <code>secureSEO-verify=abc123xyz456</code>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    2. Wait for DNS propagation (may take up to 24 hours)
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    3. Click verify when ready
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="file" className="space-y-4">
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    1. Download this HTML file:
                  </p>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-fit"
                  >
                    <FileText size={16} />
                    Download verification file
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    2. Upload the file to your website root directory:
                  </p>
                  <div className="p-3 bg-muted rounded-md font-mono text-xs overflow-x-auto">
                    <code>https://{domain}/secureSEO-abc123xyz456.html</code>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    3. Click verify when ready
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="meta" className="space-y-4">
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    1. Add this meta tag to your website's &lt;head&gt; section:
                  </p>
                  <div className="p-3 bg-muted rounded-md font-mono text-xs overflow-x-auto">
                    <code>
                      &lt;meta name="secureSEO-verification"
                      content="abc123xyz456" /&gt;
                    </code>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    2. Click verify when ready
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter>
        {isVerified ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle size={14} />
            <span>Verified on May 15, 2023</span>
          </div>
        ) : (
          <Button onClick={onVerify}>Verify Domain</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export { VerificationCard };
