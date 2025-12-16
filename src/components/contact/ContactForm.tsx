"use client";

import type React from "react";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    category: string;
    message: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({
  formData,
  onInputChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg md:text-xl">
          <MessageCircle className="h-5 w-5 mr-2" />
          Send us a Message
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Fill out the form below and we'll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                required
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                required
                className="text-sm"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category" className="text-sm">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => onInputChange("category", value)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="billing">Billing & Payments</SelectItem>
                <SelectItem value="event">Event Management</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subject" className="text-sm">
              Subject *
            </Label>
            <Input
              id="subject"
              placeholder="Brief description of your inquiry"
              value={formData.subject}
              onChange={(e) => onInputChange("subject", e.target.value)}
              required
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-sm">
              Message *
            </Label>
            <Textarea
              id="message"
              placeholder="Please provide details about your inquiry..."
              value={formData.message}
              onChange={(e) => onInputChange("message", e.target.value)}
              rows={6}
              required
              className="text-sm"
            />
          </div>
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
