export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  styles: string[];
  instagram: string;
  email: string;
  avatar: string;
  featured: boolean;
}

export const artists: Artist[] = [
  {
    id: "1",
    name: "Marcus Black",
    slug: "marcus-black",
    bio: "Specializing in blackwork, geometric, and ornamental tattoos. 12+ years experience. Published in Total Tattoo Magazine.",
    styles: ["Blackwork", "Geometric", "Ornamental", "Dotwork"],
    instagram: "https://instagram.com/marcusblacktattoo",
    email: "marcus@tattoostudio.com",
    avatar: "/artists/marcus-avatar.svg",
    featured: true,
  },
  {
    id: "2",
    name: "Sofia Rivera",
    slug: "sofia-rivera",
    bio: "Fine line, botanical, and minimalist specialist. Delicate work with botanical inspiration. Featured in Inked Magazine.",
    styles: ["Fine Line", "Botanical", "Minimalist", "Script"],
    instagram: "https://instagram.com/sofiarivera_ink",
    email: "sofia@tattoostudio.com",
    avatar: "/artists/sofia-avatar.svg",
    featured: true,
  },
  {
    id: "3",
    name: "Jin Park",
    slug: "jin-park",
    bio: "Japanese traditional (Irezumi), neo-traditional, and large-scale pieces. Apprenticed in Tokyo for 5 years.",
    styles: ["Japanese Traditional", "Neo-Traditional", "Large Scale", "Color"],
    instagram: "https://instagram.com/jinparktattoo",
    email: "jin@tattoostudio.com",
    avatar: "/artists/jin-avatar.svg",
    featured: true,
  },
  {
    id: "4",
    name: "Elena Volkov",
    slug: "elena-volkov",
    bio: "Realism, portraits, and surrealism. Award-winning artist with background in fine arts. Hyper-realistic detail work.",
    styles: ["Realism", "Portraits", "Surrealism", "Black & Grey"],
    instagram: "https://instagram.com/elenavolkov_ink",
    email: "elena@tattoostudio.com",
    avatar: "/artists/elena-avatar.svg",
    featured: false,
  },
];

export const styles = [
  "All",
  "Blackwork",
  "Fine Line",
  "Geometric",
  "Japanese",
  "Neo-Traditional",
  "Realism",
  "Botanical",
  "Minimalist",
  "Ornamental",
  "Dotwork",
  "Portraits",
  "Surrealism",
  "Script",
  "Color",
  "Black & Grey",
  "Large Scale",
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getFeaturedArtists(): Artist[] {
  return artists.filter((a) => a.featured);
}

export function getArtistsByStyle(style: string): Artist[] {
  if (style === "All") return artists;
  return artists.filter((a) => a.styles.includes(style));
}