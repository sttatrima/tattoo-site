import { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "About Us | INK STUDIO",
  description: "Adara Tattoo Collective, founded 2017, is the collaboration of Josh Dixon & Lauren Gabb. Home to multiple award winning tattoo artists in York.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">About Us</h1>
          <div className="prose prose-lg text-muted-foreground max-w-none space-y-6">
            <p>
              Adara Tattoo Collective, founded 2017, is the collaboration of Josh Dixon &amp; Lauren Gabb,
              who are joined by talented artists Ryan Farmery, Kelsey Bolton, Ruby PiggyInk, Harry Oyston,
              Emma Swanton &amp; our body piercer Danny Potts.
            </p>
            <p>
              Just a short walk from the heart of York, and home to multiple award winning tattoo artists,
              we at Adara can cater to any tattoo style and pride ourselves on our laid back &amp; welcoming studio.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2017 by Josh Dixon and Lauren Gabb, Adara Tattoo Collective has grown into
                one of York's most respected studios. Our artists bring diverse backgrounds in fine art,
                illustration, and traditional tattooing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe every tattoo is a collaboration between artist and client. From your first
                enquiry to the final session, we're here to guide you through the process.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Visit Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                10 East Parade, Heworth, York, YO31 7YJ<br />
                15m walk from York Minster
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Hours:</strong> Tuesday–Saturday, 10:30am – 5:30pm<br />
                <strong>Phone:</strong> 01904 671118<br />
                <strong>Email:</strong> hello@inkstudio.com
              </p>
              <Button variant="outline" href="/#booking" className="w-full">
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
