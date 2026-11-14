import Image from "next/image";
import { Artist } from "@/data/artists";
import { Button } from "./Button";

interface ArtistCardProps {
  artist: Artist;
  variant?: "default" | "featured";
}

export function ArtistCard({ artist, variant = "default" }: ArtistCardProps) {
  return (
    <article className={`group relative bg-muted rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 ${variant === "featured" ? "md:grid md:grid-cols-2" : ""}`}>
      <div className="relative aspect-square md:aspect-auto min-h-[300px] overflow-hidden">
        <Image
          src={artist.avatar}
          alt={artist.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={variant === "featured" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {artist.styles.slice(0, 3).map((style) => (
              <span key={style} className="px-2.5 py-1 text-xs rounded-full bg-background/80 backdrop-blur text-foreground border border-border">
                {style}
              </span>
            ))}
            {artist.styles.length > 3 && (
              <span className="px-2.5 py-1 text-xs rounded-full bg-background/80 backdrop-blur text-muted-foreground border border-border">
                +{artist.styles.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{artist.name}</h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3">{artist.bio}</p>

          <div className="flex items-center gap-4 mb-6">
            <a
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={`${artist.name} on Instagram`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={`mailto:${artist.email}`}
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={`Email ${artist.name}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full" href={`/artists/${artist.slug}`}>
            View Portfolio →
          </Button>
        </div>
      </div>
    </article>
  );
}