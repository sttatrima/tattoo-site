"use client";

import { artists, getFeaturedArtists } from "@/data/artists";
import { ArtistCard } from "./ArtistCard";
import { Button } from "./Button";

export function ArtistsSection() {
  const featuredArtists = getFeaturedArtists();
  const allArtists = artists;

  return (
    <section className="py-16 md:py-24" aria-label="Our Artists">
      <div className="container">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Artists</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the talented artists behind our studio. Each brings their unique style and expertise.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} variant="featured" />
          ))}
        </div>

        {allArtists.length > featuredArtists.length && (
          <div className="text-center">
            <Button variant="outline" href="/artists">
              View All Artists ({allArtists.length}) →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}