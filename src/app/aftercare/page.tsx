import { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Aftercare Guide | INK STUDIO",
  description: "Professional tattoo aftercare advice from Adara Tattoo Collective. Learn how to care for your fresh ink.",
};

export default function AftercarePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Aftercare Guide</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Proper aftercare is essential for healing your new tattoo and keeping the ink vibrant.
            Follow these guidelines for the best results.
          </p>

          <div className="space-y-8">
            <div className="bg-muted rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4">First 24 Hours</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Keep the bandage on for the time recommended by your artist.</li>
                <li>Wash gently with lukewarm water and fragrance-free soap.</li>
                <li>Pat dry with a clean paper towel — never rub.</li>
                <li>Apply a thin layer of recommended aftercare product.</li>
              </ul>
            </div>

            <div className="bg-muted rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4">Days 2–14</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Wash 2–3 times daily with mild soap and lukewarm water.</li>
                <li>Apply aftercare cream in a thin layer as needed.</li>
                <li>Do not pick at scabs or peeling skin.</li>
                <li>Avoid swimming, saunas, and direct sunlight.</li>
                <li>Wear loose, breathable clothing over the tattoo.</li>
              </ul>
            </div>

            <div className="bg-muted rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4">What to Avoid</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>No swimming or soaking in water for at least 2 weeks.</li>
                <li>No direct sun exposure or tanning beds.</li>
                <li>No scratching, picking, or peeling.</li>
                <li>No petroleum-based products unless advised.</li>
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-accent mb-4">When to Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you experience excessive redness, swelling, pus, or fever, please contact the studio
                or seek medical advice.
              </p>
              <Button href="/#booking" className="w-full md:w-auto">
                Contact Studio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
