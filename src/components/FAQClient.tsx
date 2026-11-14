"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I book a tattoo?",
    answer: "Fill out our booking enquiry form with your name, email, preferred artist, style, placement, size, and design ideas. We'll respond within 24-48 hours to discuss your project.",
  },
  {
    question: "Do you take walk-ins?",
    answer: "We primarily work by appointment, but we do have limited walk-in availability for smaller pieces. Please contact the studio or check our Instagram for walk-in announcements.",
  },
  {
    question: "How much does a tattoo cost?",
    answer: "Pricing depends on the size, complexity, and placement of your tattoo, as well as the artist's hourly rate. Minimum charge applies. Please enquire for a quote.",
  },
  {
    question: "Is a deposit required?",
    answer: "Yes, a non-refundable deposit is required to secure your appointment. This covers design time and is deducted from your final tattoo cost.",
  },
  {
    question: "What styles do you do?",
    answer: "Our artists specialize in blackwork, fine line, geometric, Japanese traditional, neo-traditional, realism, botanical, ornamental, dotwork, portraits, surrealism, and script.",
  },
  {
    question: "Do you do piercings?",
    answer: "Yes, Danny Potts is our body piercer and shop manager. Piercings are available by appointment and walk-in depending on availability.",
  },
  {
    question: "How old do I need to be?",
    answer: "You must be 18 or older to get a tattoo. Valid photo ID is required at your appointment.",
  },
  {
    question: "Can I bring a friend?",
    answer: "We allow one guest to accompany you to your appointment. Please keep the studio space comfortable for other clients and artists.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="bg-muted rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-expanded={isOpen}
              aria-controls={`faq-${index}`}
            >
              <span className="font-medium">{faq.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              id={`faq-${index}`}
              className={`border-t border-border px-6 pb-4 ${isOpen ? "block" : "hidden"}`}
            >
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQCTA() {
  return (
    <div className="mt-16 pt-8 border-t border-border text-center">
      <p className="text-muted-foreground mb-4">Still have questions?</p>
      <Button href="/#booking" className="w-full md:w-auto inline-block">
        Contact Us
      </Button>
    </div>
  );
}
