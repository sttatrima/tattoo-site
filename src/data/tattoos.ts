export interface Tattoo {
  id: string;
  title: string;
  artistId: string;
  artistSlug: string;
  image: string;
  thumbnail: string;
  styles: string[];
  placement: string;
  size: "small" | "medium" | "large" | "xlarge";
  description?: string;
  featured: boolean;
}

export const tattoos: Tattoo[] = [
  {
    id: "1",
    title: "Geometric Mandala",
    artistId: "1",
    artistSlug: "marcus-black",
    image: "/tattoos/marcus-1.svg",
    thumbnail: "/tattoos/marcus-1-thumb.svg",
    styles: ["Geometric", "Blackwork", "Dotwork"],
    placement: "Forearm",
    size: "medium",
    description: "Sacred geometry mandala with precise dotwork shading.",
    featured: true,
  },
  {
    id: "2",
    title: "Ornamental Sleeve",
    artistId: "1",
    artistSlug: "marcus-black",
    image: "/tattoos/marcus-2.svg",
    thumbnail: "/tattoos/marcus-2-thumb.svg",
    styles: ["Ornamental", "Blackwork"],
    placement: "Full Sleeve",
    size: "xlarge",
    description: "Full ornamental sleeve with interconnected patterns.",
    featured: true,
  },
  {
    id: "3",
    title: "Botanical Fine Line",
    artistId: "2",
    artistSlug: "sofia-rivera",
    image: "/tattoos/sofia-1.svg",
    thumbnail: "/tattoos/sofia-1-thumb.svg",
    styles: ["Fine Line", "Botanical", "Minimalist"],
    placement: "Wrist",
    size: "small",
    description: "Delicate wildflower arrangement in single needle.",
    featured: true,
  },
  {
    id: "4",
    title: "Fern & Moon Phases",
    artistId: "2",
    artistSlug: "sofia-rivera",
    image: "/tattoos/sofia-2.svg",
    thumbnail: "/tattoos/sofia-2-thumb.svg",
    styles: ["Fine Line", "Botanical"],
    placement: "Spine",
    size: "large",
    description: "Botanical spine piece with lunar phases.",
    featured: true,
  },
  {
    id: "5",
    title: "Japanese Dragon",
    artistId: "3",
    artistSlug: "jin-park",
    image: "/tattoos/jin-1.svg",
    thumbnail: "/tattoos/jin-1-thumb.svg",
    styles: ["Japanese Traditional", "Color", "Large Scale"],
    placement: "Back",
    size: "xlarge",
    description: "Full back Japanese dragon with clouds and waves.",
    featured: true,
  },
  {
    id: "6",
    title: "Koi Fish & Lotus",
    artistId: "3",
    artistSlug: "jin-park",
    image: "/tattoos/jin-2.svg",
    thumbnail: "/tattoos/jin-2-thumb.svg",
    styles: ["Japanese Traditional", "Neo-Traditional", "Color"],
    placement: "Thigh",
    size: "large",
    description: "Koi swimming through lotus flowers, neo-traditional style.",
    featured: true,
  },
  {
    id: "7",
    title: "Hyperrealistic Eye",
    artistId: "4",
    artistSlug: "elena-volkov",
    image: "/tattoos/elena-1.svg",
    thumbnail: "/tattoos/elena-1-thumb.svg",
    styles: ["Realism", "Black & Grey"],
    placement: "Inner Arm",
    size: "medium",
    description: "Photorealistic eye with incredible detail.",
    featured: true,
  },
  {
    id: "8",
    title: "Surrealist Portrait",
    artistId: "4",
    artistSlug: "elena-volkov",
    image: "/tattoos/elena-2.svg",
    thumbnail: "/tattoos/elena-2-thumb.svg",
    styles: ["Surrealism", "Realism", "Portraits"],
    placement: "Thigh",
    size: "large",
    description: "Portrait morphing into botanical elements.",
    featured: false,
  },
];

export function getTattoosByArtist(artistSlug: string): Tattoo[] {
  return tattoos.filter((t) => t.artistSlug === artistSlug);
}

export function getFeaturedTattoos(): Tattoo[] {
  return tattoos.filter((t) => t.featured);
}

export function getTattoosByStyle(style: string): Tattoo[] {
  if (style === "All") return tattoos;
  return tattoos.filter((t) => t.styles.includes(style));
}

export function getTattooById(id: string): Tattoo | undefined {
  return tattoos.find((t) => t.id === id);
}