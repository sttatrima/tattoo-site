import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { artists, getArtistBySlug } from "@/data/artists";
import { tattoos, getTattoosByArtist } from "@/data/tattoos";
import { generateArtistJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return { title: "Artist Not Found" };

  return {
    title: `${artist.name} | Tattoo Artist`,
    description: artist.bio,
    openGraph: {
      title: `${artist.name} | INK STUDIO`,
      description: artist.bio,
      images: [{ url: artist.avatar }],
    },
  };
}

export default function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const artistTattoos = getTattoosByArtist(artist.slug);
  const artistUrl = `https://inkstudio.com/artists/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateArtistJsonLd({
            name: artist.name,
            slug: artist.slug,
            bio: artist.bio,
            image: artist.avatar,
            url: artistUrl,
            email: artist.email,
            instagram: artist.instagram,
          }),
        }}
      />

      <section className="relative h-[60vh] md:h-[50vh] overflow-hidden">
        <Image
          src={artist.avatar}
          alt={artist.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="container relative z-10 flex flex-col justify-between h-full p-6 md:p-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {artist.styles[0]} Specialist
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{artist.name}</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">{artist.bio}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-8">
            <Button href={`mailto:${artist.email}`} variant="outline" className="flex-1 sm:w-auto">
              Email {artist.name.split(" ")[0]}
            </Button>
            {artist.instagram && (
              <Button href={artist.instagram} variant="ghost" className="flex-1 sm:w-auto">
                Instagram
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-muted rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold mb-4">Styles</h2>
                <div className="flex flex-wrap gap-2">
                  {artist.styles.map((style) => (
                    <span key={style} className="px-3 py-1 text-xs rounded-full bg-accent-muted text-accent border border-accent/30">
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold mb-4">Availability</h2>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm font-medium text-success">Diary Open</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting bookings. Please allow 2-3 weeks for a design consultation.
                </p>
              </div>

              <div className="bg-muted rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold mb-4">Contact</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {artist.name.split(" ")[0]} is available for custom work and flash appointments.
                </p>
                <Button href={`mailto:${artist.email}`} className="w-full" variant="outline">
                  Send Enquiry
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Portfolio</h2>
                <p className="text-sm text-muted-foreground">
                  {artistTattoos.length} pieces
                </p>
              </div>

              {artistTattoos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artistTattoos.map((tattoo) => (
                    <article key={tattoo.id} className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={tattoo.image}
                        alt={tattoo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-sm">{tattoo.title}</h3>
                        <p className="text-xs text-muted-foreground">{tattoo.placement}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No portfolio pieces available yet. Check back soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted border-t border-border">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Book with {artist.name.split(" ")[0]}</h2>
          <p className="text-muted-foreground mb-8">
            Include your style, placement, size (in cm), and any reference ideas.
          </p>
          <Button href="/#booking" className="w-full md:w-auto">
            Start Booking Enquiry
          </Button>
        </div>
      </section>
    </div>
  );
}
