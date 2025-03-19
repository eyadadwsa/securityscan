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
  FileText,
  Clock,
  Upload,
  Lock,
  Code,
  Languages,
  Cookie,
  BarChart,
  FileCode,
  Link,
  Image,
  Video,
  Zap,
  ExternalLink,
  Map,
  PlusCircle,
  Layers,
  LayoutTemplate,
  PieChart,
  Download,
  ClipboardList,
  Sliders,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SystemConfiguration() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "SecureSEO",
    siteDescription: "Comprehensive security and SEO analysis for your website",
    contactEmail: "support@secureseo.com",
    supportPhone: "+1 (800) 123-4567",
    defaultLanguage: "en",
    siteUrl: "https://secureseo.com",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    logoUrl: "",
    faviconUrl: "",
    enableRegistration: true,
    enableCookieConsent: true,
    enableAnalytics: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@secureseo.com",
    smtpPassword: "••••••••••••",
    fromEmail: "notifications@secureseo.com",
    fromName: "SecureSEO Notifications",
    enableSsl: true,
    welcomeEmailTemplate:
      "Welcome to SecureSEO! We're excited to have you on board...",
    reportEmailTemplate: "Your scan report is now available...",
    alertEmailTemplate:
      "Security Alert: We've detected an issue with your website...",
  });

  const [securitySettings, setSecuritySettings] = useState({
    enableSocialLogin: true,
    enable2FA: true,
    passwordMinLength: "8",
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    passwordExpiryDays: "90",
    maxLoginAttempts: "5",
    enableFirewall: true,
    firewallRules: "default",
    enableMalwareProtection: true,
    malwareScanFrequency: "daily",
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

  const [seoSettings, setSeoSettings] = useState({
    enableRobotsTxt: true,
    enableSitemap: true,
    sitemapFrequency: "weekly",
    defaultMetaTitle: "${pageName} | SecureSEO",
    defaultMetaDescription:
      "Comprehensive security and SEO analysis for your website",
    enableSchemaMarkup: true,
    schemaType: "Organization",
    enableOpenGraph: true,
    enableTwitterCards: true,
    keywordDensityThreshold: "2",
    minContentLength: "300",
    enableBrokenLinkCheck: true,
    enableImageAltTags: true,
    enableCanonicalUrls: true,
    enableHreflangTags: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    googleApiKey: "••••••••••••••••••••••••••••••••••",
    bingApiKey: "••••••••••••••••••••••••••••••••••",
    translationApiKey: "••••••••••••••••••••••••••••••••••",
    enableGoogleIntegration: true,
    enableBingIntegration: false,
    enableTranslationApi: true,
    googleAnalyticsId: "UA-XXXXXXXXX-X",
    googleSearchConsoleVerification: "",
    bingWebmasterVerification: "",
  });

  const [languageSettings, setLanguageSettings] = useState({
    supportedLanguages: ["en", "fr", "es", "ar", "zh"],
    defaultDirection: "ltr",
    enableAutoTranslation: false,
    translationMemory: true,
    customTranslations: {},
  });

  const handleGeneralSettingsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    });
  };

  const handleEmailSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: value,
    });
  };

  const handleSecuritySettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSecuritySettings({
      ...securitySettings,
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

  const handleSeoSettingsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setSeoSettings({
      ...seoSettings,
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

  const handleLanguageSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setLanguageSettings({
      ...languageSettings,
      [name]: value,
    });
  };

  const handleSwitchChange = (
    checked: boolean,
    name: string,
    settingsType: string,
  ) => {
    switch (settingsType) {
      case "general":
        setGeneralSettings({
          ...generalSettings,
          [name]: checked,
        });
        break;
      case "email":
        setEmailSettings({
          ...emailSettings,
          [name]: checked,
        });
        break;
      case "security":
        setSecuritySettings({
          ...securitySettings,
          [name]: checked,
        });
        break;
      case "scan":
        setScanSettings({
          ...scanSettings,
          [name]: checked,
        });
        break;
      case "seo":
        setSeoSettings({
          ...seoSettings,
          [name]: checked,
        });
        break;
      case "integration":
        setIntegrationSettings({
          ...integrationSettings,
          [name]: checked,
        });
        break;
      case "language":
        setLanguageSettings({
          ...languageSettings,
          [name]: checked,
        });
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (name: string, settingsType: string) => {
    // This would be implemented to handle file uploads
    console.log(`File upload for ${name} in ${settingsType} settings`);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-7 md:w-auto w-full">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock size={16} />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="scanning" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Scanning</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search size={16} />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center gap-2">
            <Languages size={16} />
            <span className="hidden sm:inline">Languages</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
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
                <h3 className="text-lg font-medium">Site Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      name="siteUrl"
                      type="url"
                      value={generalSettings.siteUrl}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
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

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="logoUpload">Site Logo</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="logoUrl"
                        name="logoUrl"
                        value={generalSettings.logoUrl}
                        onChange={handleGeneralSettingsChange}
                        placeholder="Logo URL or upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleFileUpload("logo", "general")}
                      >
                        <Upload size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faviconUpload">Site Favicon</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="faviconUrl"
                        name="faviconUrl"
                        value={generalSettings.faviconUrl}
                        onChange={handleGeneralSettingsChange}
                        placeholder="Favicon URL or upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleFileUpload("favicon", "general")}
                      >
                        <Upload size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">
                  Contact Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
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
                </div>

                <h3 className="text-lg font-medium pt-4">Regional Settings</h3>
                <div className="grid gap-4 md:grid-cols-3">
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

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      name="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={generalSettings.timezone}
                      onChange={handleGeneralSettingsChange}
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">
                        Eastern Time (ET)
                      </option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">
                        Pacific Time (PT)
                      </option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select
                      id="dateFormat"
                      name="dateFormat"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={generalSettings.dateFormat}
                      onChange={handleGeneralSettingsChange}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Other Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableRegistration">
                        User Registration
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register on the platform
                      </p>
                    </div>
                    <Switch
                      id="enableRegistration"
                      checked={generalSettings.enableRegistration}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableRegistration",
                          "general",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableCookieConsent">
                        Cookie Consent
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Show cookie consent banner to users
                      </p>
                    </div>
                    <Switch
                      id="enableCookieConsent"
                      checked={generalSettings.enableCookieConsent}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableCookieConsent",
                          "general",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableAnalytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable usage analytics tracking
                      </p>
                    </div>
                    <Switch
                      id="enableAnalytics"
                      checked={generalSettings.enableAnalytics}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableAnalytics",
                          "general",
                        )
                      }
                    />
                  </div>
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

        {/* Email Settings Tab */}
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
                <h3 className="text-lg font-medium">SMTP Configuration</h3>
                <div className="grid gap-4 md:grid-cols-2">
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
                </div>

                <div className="grid gap-4 md:grid-cols-2">
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

                <h3 className="text-lg font-medium pt-4">Email Identity</h3>
                <div className="grid gap-4 md:grid-cols-2">
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
                </div>

                <h3 className="text-lg font-medium pt-4">Email Templates</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcomeEmailTemplate">
                      Welcome Email Template
                    </Label>
                    <Textarea
                      id="welcomeEmailTemplate"
                      name="welcomeEmailTemplate"
                      value={emailSettings.welcomeEmailTemplate}
                      onChange={handleEmailSettingsChange}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Available variables: {"{username}"}, {"{siteName}"},{" "}
                      {"{loginLink}"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportEmailTemplate">
                      Report Email Template
                    </Label>
                    <Textarea
                      id="reportEmailTemplate"
                      name="reportEmailTemplate"
                      value={emailSettings.reportEmailTemplate}
                      onChange={handleEmailSettingsChange}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Available variables: {"{username}"}, {"{reportName}"},{" "}
                      {"{reportDate}"}, {"{reportLink}"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alertEmailTemplate">
                      Alert Email Template
                    </Label>
                    <Textarea
                      id="alertEmailTemplate"
                      name="alertEmailTemplate"
                      value={emailSettings.alertEmailTemplate}
                      onChange={handleEmailSettingsChange}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Available variables: {"{username}"}, {"{alertType}"},{" "}
                      {"{alertDetails}"}, {"{dashboardLink}"}
                    </p>
                  </div>
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

        {/* Security Settings Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>
                Configure security settings and policies for your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableSocialLogin">Social Login</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to sign in with social accounts
                      </p>
                    </div>
                    <Switch
                      id="enableSocialLogin"
                      checked={securitySettings.enableSocialLogin}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableSocialLogin",
                          "security",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable2FA">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require two-factor authentication for all users
                      </p>
                    </div>
                    <Switch
                      id="enable2FA"
                      checked={securitySettings.enable2FA}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enable2FA", "security")
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Password Policy</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">
                      Minimum Password Length
                    </Label>
                    <Input
                      id="passwordMinLength"
                      name="passwordMinLength"
                      type="number"
                      min="6"
                      max="32"
                      value={securitySettings.passwordMinLength}
                      onChange={handleSecuritySettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiryDays">
                      Password Expiry (days)
                    </Label>
                    <Input
                      id="passwordExpiryDays"
                      name="passwordExpiryDays"
                      type="number"
                      min="0"
                      max="365"
                      value={securitySettings.passwordExpiryDays}
                      onChange={handleSecuritySettingsChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 for no expiration
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordRequireUppercase">
                      Require Uppercase Letters
                    </Label>
                    <Switch
                      id="passwordRequireUppercase"
                      checked={securitySettings.passwordRequireUppercase}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "passwordRequireUppercase",
                          "security",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordRequireNumbers">
                      Require Numbers
                    </Label>
                    <Switch
                      id="passwordRequireNumbers"
                      checked={securitySettings.passwordRequireNumbers}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "passwordRequireNumbers",
                          "security",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordRequireSymbols">
                      Require Special Characters
                    </Label>
                    <Switch
                      id="passwordRequireSymbols"
                      checked={securitySettings.passwordRequireSymbols}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "passwordRequireSymbols",
                          "security",
                        )
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="maxLoginAttempts">
                    Max Failed Login Attempts
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    name="maxLoginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={securitySettings.maxLoginAttempts}
                    onChange={handleSecuritySettingsChange}
                  />
                </div>

                <h3 className="text-lg font-medium pt-4">
                  Protection Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableFirewall">
                        Web Application Firewall
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable WAF protection against common attacks
                      </p>
                    </div>
                    <Switch
                      id="enableFirewall"
                      checked={securitySettings.enableFirewall}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableFirewall",
                          "security",
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firewallRules">Firewall Rule Set</Label>
                    <select
                      id="firewallRules"
                      name="firewallRules"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={securitySettings.firewallRules}
                      onChange={handleSecuritySettingsChange}
                      disabled={!securitySettings.enableFirewall}
                    >
                      <option value="default">Default Protection</option>
                      <option value="strict">Strict Protection</option>
                      <option value="custom">Custom Rules</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableMalwareProtection">
                        Malware Protection
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable scanning for malware and suspicious code
                      </p>
                    </div>
                    <Switch
                      id="enableMalwareProtection"
                      checked={securitySettings.enableMalwareProtection}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableMalwareProtection",
                          "security",
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="malwareScanFrequency">
                      Malware Scan Frequency
                    </Label>
                    <select
                      id="malwareScanFrequency"
                      name="malwareScanFrequency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={securitySettings.malwareScanFrequency}
                      onChange={handleSecuritySettingsChange}
                      disabled={!securitySettings.enableMalwareProtection}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-600 dark:text-yellow-400">
                  <p className="font-medium">Security Warning</p>
                  <p>
                    Changing security settings may affect user access and system
                    protection. Review changes carefully before saving.
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

        {/* Scanning Settings Tab */}
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

        {/* SEO Settings Tab */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Configuration</CardTitle>
              <CardDescription>
                Configure search engine optimization settings for your websites
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General SEO Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableRobotsTxt">Robots.txt</Label>
                      <p className="text-sm text-muted-foreground">
                        Generate and manage robots.txt file
                      </p>
                    </div>
                    <Switch
                      id="enableRobotsTxt"
                      checked={seoSettings.enableRobotsTxt}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enableRobotsTxt", "seo")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableSitemap">XML Sitemap</Label>
                      <p className="text-sm text-muted-foreground">
                        Generate and manage XML sitemap
                      </p>
                    </div>
                    <Switch
                      id="enableSitemap"
                      checked={seoSettings.enableSitemap}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enableSitemap", "seo")
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sitemapFrequency">
                      Sitemap Update Frequency
                    </Label>
                    <select
                      id="sitemapFrequency"
                      name="sitemapFrequency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={seoSettings.sitemapFrequency}
                      onChange={handleSeoSettingsChange}
                      disabled={!seoSettings.enableSitemap}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Meta Tags</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultMetaTitle">
                      Default Page Title Format
                    </Label>
                    <Input
                      id="defaultMetaTitle"
                      name="defaultMetaTitle"
                      value={seoSettings.defaultMetaTitle}
                      onChange={handleSeoSettingsChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {"{pageName}"} as a placeholder for the actual page
                      name
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultMetaDescription">
                      Default Meta Description
                    </Label>
                    <Textarea
                      id="defaultMetaDescription"
                      name="defaultMetaDescription"
                      value={seoSettings.defaultMetaDescription}
                      onChange={handleSeoSettingsChange}
                      rows={2}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableOpenGraph">Open Graph Tags</Label>
                      <Switch
                        id="enableOpenGraph"
                        checked={seoSettings.enableOpenGraph}
                        onCheckedChange={(checked) =>
                          handleSwitchChange(checked, "enableOpenGraph", "seo")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableTwitterCards">
                        Twitter Card Tags
                      </Label>
                      <Switch
                        id="enableTwitterCards"
                        checked={seoSettings.enableTwitterCards}
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            checked,
                            "enableTwitterCards",
                            "seo",
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Content Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="keywordDensityThreshold">
                        Keyword Density Threshold (%)
                      </Label>
                      <Input
                        id="keywordDensityThreshold"
                        name="keywordDensityThreshold"
                        type="number"
                        min="0.5"
                        max="10"
                        step="0.1"
                        value={seoSettings.keywordDensityThreshold}
                        onChange={handleSeoSettingsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minContentLength">
                        Minimum Content Length
                      </Label>
                      <Input
                        id="minContentLength"
                        name="minContentLength"
                        type="number"
                        min="100"
                        value={seoSettings.minContentLength}
                        onChange={handleSeoSettingsChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum word count for content to be considered
                        SEO-friendly
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableImageAltTags">
                      Enforce Image Alt Tags
                    </Label>
                    <Switch
                      id="enableImageAltTags"
                      checked={seoSettings.enableImageAltTags}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enableImageAltTags", "seo")
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Link Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableBrokenLinkCheck">
                      Broken Link Detection
                    </Label>
                    <Switch
                      id="enableBrokenLinkCheck"
                      checked={seoSettings.enableBrokenLinkCheck}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableBrokenLinkCheck",
                          "seo",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableCanonicalUrls">Canonical URLs</Label>
                    <Switch
                      id="enableCanonicalUrls"
                      checked={seoSettings.enableCanonicalUrls}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableCanonicalUrls",
                          "seo",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableHreflangTags">Hreflang Tags</Label>
                    <Switch
                      id="enableHreflangTags"
                      checked={seoSettings.enableHreflangTags}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enableHreflangTags", "seo")
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Schema Markup</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableSchemaMarkup">
                      Enable Schema Markup
                    </Label>
                    <Switch
                      id="enableSchemaMarkup"
                      checked={seoSettings.enableSchemaMarkup}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enableSchemaMarkup", "seo")
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schemaType">Default Schema Type</Label>
                    <select
                      id="schemaType"
                      name="schemaType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={seoSettings.schemaType}
                      onChange={handleSeoSettingsChange}
                      disabled={!seoSettings.enableSchemaMarkup}
                    >
                      <option value="Organization">Organization</option>
                      <option value="LocalBusiness">Local Business</option>
                      <option value="Person">Person</option>
                      <option value="Website">Website</option>
                      <option value="WebPage">Web Page</option>
                    </select>
                  </div>
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

        {/* Integrations Tab */}
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
                <h3 className="text-lg font-medium">Google Integrations</h3>
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
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    name="googleAnalyticsId"
                    value={integrationSettings.googleAnalyticsId}
                    onChange={handleIntegrationSettingsChange}
                    disabled={!integrationSettings.enableGoogleIntegration}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleSearchConsoleVerification">
                    Search Console Verification
                  </Label>
                  <Input
                    id="googleSearchConsoleVerification"
                    name="googleSearchConsoleVerification"
                    value={integrationSettings.googleSearchConsoleVerification}
                    onChange={handleIntegrationSettingsChange}
                    placeholder="Meta tag verification code"
                    disabled={!integrationSettings.enableGoogleIntegration}
                  />
                </div>

                <h3 className="text-lg font-medium pt-4">Bing Integrations</h3>
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
                  <Label htmlFor="bingWebmasterVerification">
                    Webmaster Verification
                  </Label>
                  <Input
                    id="bingWebmasterVerification"
                    name="bingWebmasterVerification"
                    value={integrationSettings.bingWebmasterVerification}
                    onChange={handleIntegrationSettingsChange}
                    placeholder="Meta tag verification code"
                    disabled={!integrationSettings.enableBingIntegration}
                  />
                </div>

                <h3 className="text-lg font-medium pt-4">
                  Translation Services
                </h3>
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

        {/* Languages Tab */}
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>
                Configure multilingual support and translations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language Configuration</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="supportedLanguages">
                      Supported Languages
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center p-2 border rounded-md">
                        <span className="mr-2">English (en)</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center p-2 border rounded-md">
                        <span className="mr-2">French (fr)</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center p-2 border rounded-md">
                        <span className="mr-2">Spanish (es)</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center p-2 border rounded-md">
                        <span className="mr-2">Arabic (ar)</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center p-2 border rounded-md">
                        <span className="mr-2">Chinese (zh)</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <PlusCircle size={14} />
                        Add Language
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultDirection">
                      Default Text Direction
                    </Label>
                    <select
                      id="defaultDirection"
                      name="defaultDirection"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={languageSettings.defaultDirection}
                      onChange={handleLanguageSettingsChange}
                    >
                      <option value="ltr">Left to Right (LTR)</option>
                      <option value="rtl">Right to Left (RTL)</option>
                      <option value="auto">Auto (Based on Language)</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">
                  Translation Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableAutoTranslation">
                        Automatic Translation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically translate content to supported languages
                      </p>
                    </div>
                    <Switch
                      id="enableAutoTranslation"
                      checked={languageSettings.enableAutoTranslation}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "enableAutoTranslation",
                          "language",
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="translationMemory">
                        Translation Memory
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Store and reuse previous translations
                      </p>
                    </div>
                    <Switch
                      id="translationMemory"
                      checked={languageSettings.translationMemory}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "translationMemory",
                          "language",
                        )
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">
                  Custom Translations
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Translation Management</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Upload size={14} />
                      Import Translations
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 text-center text-muted-foreground">
                    <p>
                      Use the translation editor to manage custom translations
                      for your interface elements.
                    </p>
                    <Button variant="secondary" className="mt-2">
                      Open Translation Editor
                    </Button>
                  </div>
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
