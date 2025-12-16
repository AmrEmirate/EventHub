import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems: FAQItem[];
}

export function FAQSection({ faqItems }: FAQSectionProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg md:text-xl">
            <HelpCircle className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Quick answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h4 className="font-semibold mb-2 text-sm md:text-base">
                {faq.question}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Need Immediate Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm md:text-base">Help Center</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Browse our knowledge base
              </p>
            </div>
            <Button variant="outline" size="sm">
              Visit
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm md:text-base">Live Chat</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Chat with our support team
              </p>
            </div>
            <Button variant="outline" size="sm">
              Start Chat
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm md:text-base">WhatsApp</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Message us on WhatsApp
              </p>
            </div>
            <Button variant="outline" size="sm">
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
