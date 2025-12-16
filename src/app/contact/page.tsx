"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQSection } from "@/components/contact/FAQSection";
import { OfficeLocations } from "@/components/contact/OfficeLocations";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "support@eventhub.id",
      action: "mailto:support@eventhub.id",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: "+62 21 1234 5678",
      action: "tel:+622112345678",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "Jakarta, Indonesia",
      action: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "Our support team is available",
      value: "Mon-Fri: 9AM-6PM WIB",
      action: "#",
    },
  ];

  const faqItems = [
    {
      question: "How do I create an event?",
      answer:
        "Sign up as an organizer, go to your dashboard, and click 'Create Event'. Fill in all the required details and publish your event.",
    },
    {
      question: "How do I get a refund?",
      answer:
        "Refunds are processed according to the event organizer's refund policy. Contact the organizer directly or reach out to our support team.",
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer:
        "Ticket transfers depend on the event organizer's policy. Check your ticket details or contact the organizer for transfer options.",
    },
    {
      question: "How do I use my points and coupons?",
      answer:
        "During checkout, you can apply coupon codes and choose to use your points for discounts. Points and coupons will be automatically applied.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader currentPath="/contact" />

      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto">
            Have questions? We're here to help! Reach out to our friendly
            support team
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full mb-3 md:mb-4">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">
                      {info.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3">
                      {info.description}
                    </p>
                    {info.action !== "#" ? (
                      <a
                        href={info.action}
                        className="text-primary hover:underline font-medium text-sm md:text-base"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-sm md:text-base">
                        {info.value}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <ContactForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            </div>
            <div>
              <FAQSection faqItems={faqItems} />
            </div>
          </div>

          <OfficeLocations />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
