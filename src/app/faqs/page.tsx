import { Metadata } from "next";
import { FAQAccordion, FAQCTA } from "@/components/FAQClient";

export const metadata: Metadata = {
  title: "FAQs | INK STUDIO",
  description: "Frequently asked questions about booking, aftercare, pricing, and studio policies at Adara Tattoo Collective.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">FAQs</h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about booking, aftercare, and visiting the studio.
            </p>
          </div>

          <FAQAccordion />

          <FAQCTA />
        </div>
      </section>
    </div>
  );
}
