import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award, Globe, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - SecureSEO",
  description:
    "Learn about our mission to secure and optimize websites worldwide",
};

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          About SecureSEO
        </h1>
        <p className="text-xl text-muted-foreground">
          We help businesses secure their online presence and maximize their
          visibility through advanced security and SEO analysis.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="h-60 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
              alt="Team working on security analysis"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Founded in 2018, SecureSEO was created with a simple mission: to
              make the web safer and more accessible. We believe that every
              business deserves robust security and optimal visibility,
              regardless of size or technical expertise.
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-60 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Team meeting"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              Our diverse team brings together experts in cybersecurity, search
              engine optimization, and web development. With backgrounds from
              leading tech companies and security firms, we combine deep
              technical knowledge with a passion for helping businesses succeed
              online.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          What Sets Us Apart
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 space-y-2">
              <Shield className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-medium">Comprehensive Protection</h3>
              <p className="text-muted-foreground">
                Our platform covers all major security vulnerabilities, not just
                the basics, ensuring your site is protected against emerging
                threats.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <Globe className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-medium">Multilingual Support</h3>
              <p className="text-muted-foreground">
                We support multiple languages with proper RTL handling, making
                our platform accessible to users worldwide.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <Award className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-medium">Industry Expertise</h3>
              <p className="text-muted-foreground">
                Our recommendations are backed by years of experience and
                constantly updated to reflect the latest best practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <Clock className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-medium">Continuous Monitoring</h3>
              <p className="text-muted-foreground">
                We don't just scan once - our platform provides ongoing
                monitoring to catch new vulnerabilities as they emerge.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-medium mb-2">Security First</h3>
            <p className="text-muted-foreground">
              We believe security is a fundamental right for all website owners.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              Clear explanations and actionable recommendations, no technical
              jargon.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Constantly evolving our platform to address new threats and
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
