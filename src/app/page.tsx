import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { ArtistsSection } from "@/components/ArtistsSection";
import { BookingForm } from "@/components/BookingForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Gallery />
        <ArtistsSection />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}