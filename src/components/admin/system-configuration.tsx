"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Globe,
  Mail,
  Shield,
  Search,
  Palette,
  Save,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

export function SystemConfiguration() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "SecureSEO",
    siteDescription: "Comprehensive security and SEO analysis for your website",
    contactEmail: "support@secureseo.com",
    supportPhone: "+1 (800) 123-4567",
    defaultLanguage: "en",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@secureseo.com",
    smtpPassword: "••••••••••••",
    fromEmail: "notifications@secureseo.com",
    fromName: "SecureSEO Notifications",
    enableSsl: true,
  });

  const [scanSettings, setScanSettings] = useState({
    securityScanTimeout: "300",
    seoScanTimeout: "180",
    performanceScanTimeout: "120",
    maxConcurrentScans: "10",
    enableDetailedLogs: true,
    enableUserInitiatedScans: true,
    enableAutomaticScans: true,
    scanFrequency: "weekly",
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    googleApiKey: "••••••••••••••••••••••••••••••••••",
    bingApiKey: "••••••••••••••••••••••••••••••••••",
    translationApiKey: "••••••••••••••••••••••••••••••••••",
    enableGoogleIntegration: true,
    enableBingIntegration: false,
    enableTranslationApi: true,
  });

  const handleGeneralSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    });
  };

  const handleEmailSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: value,
    });
  };

  const handleScanSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setScanSettings({
      ...scanSettings,
      [name]: value,
    });
  };

  const handleIntegrationSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setIntegrationSettings({
      ...integrationSettings,
      [name]: value,
    });
  };

  const handleSwitchChange = (
    checked: boolean,
    name: string,
    settingsType: string,
  ) => {
    switch (settingsType) {
      case "email":
        setEmailSettings({
          ...emailSettings,
          [name]: checked,
        });
        break;
      case "scan":
        setScanSettings({
          ...scanSettings,
          [name]: checked,
        });
        break;
      case "integration":
        setIntegrationSettings({
          ...integrationSettings,
          [name]: checked,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="scanning" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Scanning</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic settings for your SecureSEO platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralSettingsChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    name="supportPhone"
                    value={generalSettings.supportPhone}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <select
                    id="defaultLanguage"
                    name="defaultLanguage"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={generalSettings.defaultLanguage}
                    onChange={handleGeneralSettingsChange}
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="ar">Arabic</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email settings for notifications and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableSsl"
                    checked={emailSettings.enableSsl}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(checked, "enableSsl", "email")
                    }
                  />
                  <Label htmlFor="enableSsl">Enable SSL/TLS</Label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  Test Connection
                </Button>
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanning">
          <Card>
            <CardHeader>
              <CardTitle>Scanning Configuration</CardTitle>
              <CardDescription>
                Configure settings for security, SEO, and performance scanning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="securityScanTimeout">
                      Security Scan Timeout (seconds)
                    </Label>
                    <Input
                      id="securityScanTimeout"
                      name="securityScanTimeout"
                      type="number"
                      value={scanSettings.securityScanTimeout}
                      onChange={handleScanSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoScanTimeout">
                      SEO Scan Timeout (seconds)
                    </Label>
                    <Input
                      id="seoScanTimeout"
                      name="seoScanTimeout"
                      type="number"
                      value={scanSettings.seoScanTimeout}
                      onChange={handleScanSettingsChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="performanceScanTimeout">
                      Performance Scan Timeout (seconds)
                    </Label>
                    <Input
                      id="performanceScanTimeout"
                      name="performanceScanTimeout"
                      type="number"
                      value={scanSettings.performanceScanTimeout}
                      onChange={handleScanSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxConcurrentScans">
                      Max Concurrent Scans
                    </Label>
                    <Input
                      id="maxConcurrentScans"
                      name="maxConcurrentScans"
                      type="number"
                      value={scanSettings.maxConcurrentScans}
                      onChange={handleScanSettingsChange}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableDetailedLogs"
                    checked={scanSettings.enableDetailedLogs}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(checked, "enableDetailedLogs", "scan")
                    }
                  />
                  <Label htmlFor="enableDetailedLogs">
                    Enable Detailed Scan Logs
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableUserInitiatedScans"
                    checked={scanSettings.enableUserInitiatedScans}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        checked,
                        "enableUserInitiatedScans",
                        "scan",
                      )
                    }
                  />
                  <Label htmlFor="enableUserInitiatedScans">
                    Allow User-Initiated Scans
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableAutomaticScans"
                    checked={scanSettings.enableAutomaticScans}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        checked,
                        "enableAutomaticScans",
                        "scan",
                      )
                    }
                  />
                  <Label htmlFor="enableAutomaticScans">
                    Enable Automatic Scheduled Scans
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scanFrequency">
                    Automatic Scan Frequency
                  </Label>
                  <select
                    id="scanFrequency"
                    name="scanFrequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={scanSettings.scanFrequency}
                    onChange={handleScanSettingsChange}
                    disabled={!scanSettings.enableAutomaticScans}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-600 dark:text-yellow-400">
                  <p className="font-medium">Warning</p>
                  <p>
                    Changing scan timeouts and concurrency settings may affect
                    system performance. Increase these values with caution,
                    especially on systems with limited resources.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure third-party API integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="googleApiKey">Google API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableGoogleIntegration"
                        checked={integrationSettings.enableGoogleIntegration}
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            checked,
                            "enableGoogleIntegration",
                            "integration",
                          )
                        }
                      />
                      <Label
                        htmlFor="enableGoogleIntegration"
                        className="text-sm"
                      >
                        Enable
                      </Label>
                    </div>
                  </div>
                  <Input
                    id="googleApiKey"
                    name="googleApiKey"
                    value={integrationSettings.googleApiKey}
                    onChange={handleIntegrationSettingsChange}
                    disabled={!integrationSettings.enableGoogleIntegration}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for Google Search Console integration and keyword
                    analysis
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bingApiKey">Bing API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableBingIntegration"
                        checked={integrationSettings.enableBingIntegration}
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            checked,
                            "enableBingIntegration",
                            "integration",
                          )
                        }
                      />
                      <Label
                        htmlFor="enableBingIntegration"
                        className="text-sm"
                      >
                        Enable
                      </Label>
                    </div>
                  </div>
                  <Input
                    id="bingApiKey"
                    name="bingApiKey"
                    value={integrationSettings.bingApiKey}
                    onChange={handleIntegrationSettingsChange}
                    disabled={!integrationSettings.enableBingIntegration}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for Bing Webmaster Tools integration
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="translationApiKey">
                      Translation API Key
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableTranslationApi"
                        checked={integrationSettings.enableTranslationApi}
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            checked,
                            "enableTranslationApi",
                            "integration",
                          )
                        }
                      />
                      <Label htmlFor="enableTranslationApi" className="text-sm">
                        Enable
                      </Label>
                    </div>
                  </div>
                  <Input
                    id="translationApiKey"
                    name="translationApiKey"
                    value={integrationSettings.translationApiKey}
                    onChange={handleIntegrationSettingsChange}
                    disabled={!integrationSettings.enableTranslationApi}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for multilingual support and content translation
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
