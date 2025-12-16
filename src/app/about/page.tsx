"use client";

import Link from "next/link";
import { Users, Target, Award, Heart, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TeamSection } from "@/components/about/TeamSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { StorySection } from "@/components/about/StorySection";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";

export default function AboutPage() {
  const stats = [
    { label: "Events Organized", value: "10,000+", icon: Target },
    { label: "Happy Customers", value: "500,000+", icon: Users },
    { label: "Event Organizers", value: "2,500+", icon: Award },
    { label: "Cities Covered", value: "50+", icon: Heart },
  ];

  const features = [
    {
      title: "Easy Event Discovery",
      description:
        "Find events that match your interests with our advanced search and filtering system.",
      icon: Target,
    },
    {
      title: "Secure Transactions",
      description:
        "Safe and secure payment processing with multiple payment options available.",
      icon: CheckCircle,
    },
    {
      title: "Organizer Tools",
      description:
        "Comprehensive dashboard for event organizers to manage events, tickets, and analytics.",
      icon: Award,
    },
    {
      title: "Rewards Program",
      description:
        "Earn points and get exclusive discounts through our referral and loyalty program.",
      icon: Star,
    },
  ];

  const team = [
    {
      name: "Ahmad Rizki",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Passionate about connecting people through amazing events and experiences.",
    },
    {
      name: "Sarah Putri",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      bio: "Tech enthusiast focused on building scalable and user-friendly platforms.",
    },
    {
      name: "Budi Santoso",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Ensuring smooth operations and exceptional customer experience.",
    },
    {
      name: "Siti Nurhaliza",
      role: "Head of Marketing",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Building brand awareness and connecting with our community.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader currentPath="/about" />

      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            About EventHub
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto">
            We're on a mission to connect people through amazing events and
            create unforgettable experiences across Indonesia
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full mb-3 md:mb-4">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <StorySection />
      <MissionVisionSection />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Why Choose EventHub?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need for a seamless event experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full mb-3 md:mb-4">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <CardTitle className="text-base md:text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <TeamSection team={team} />
      <ValuesSection />

      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of event organizers and attendees who trust EventHub
            for their event needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Sign Up Now
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              >
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
