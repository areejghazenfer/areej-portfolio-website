import project1Hero from "@/assets/LIVING ROOM UPDATED.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

// Project 1 — The Adaptive Frame
import p1_1R from "@/assets/LIVING ROOM UPDATED CROPPED.png";
import p1_2L from "@/assets/project1-images/Page_2_L.jpg";
import p1_2R from "@/assets/project1-images/Page_2_R.jpg";
import p1_3 from "@/assets/project1-images/Page_3.jpg";
import p1_4L from "@/assets/AG_ADU_KITCHEN CROPPED.png";
import p1_4R from "@/assets/project1-images/Page_4_R.jpg";
import p1_5L from "@/assets/AG_ADU_BEDROOM CROPPED.png";
import p1_5R from "@/assets/project1-images/Page_5_R.jpg";
import p1_6L from "@/assets/AG_ADU_BATHROOM CROPPED.png";
import p1_6R from "@/assets/project1-images/Adaptive_Frame_Page_6_R.jpg";
import p1_7 from "@/assets/project1-images/Page_7.jpg";
import p1_8 from "@/assets/project1-images/Page_8.jpg";

export interface ProjectImage {
  src: string;
  /** If set, this image is displayed side-by-side with a paired image */
  pair?: string;
  caption?: string;
  /** Full double-page landscape spread — renders at full width */
  fullSpread?: boolean;
  /** Portrait image that should match the width of standard landscape pages, allowing it to be taller */
  tallImage?: boolean;
}

export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: "interiors" | "craft" | "research";
  image: string;
  images: (string | ProjectImage)[];
  description: string;
  year: string;
  details?: ProjectDetail[];
}

export const projects: Project[] = [
  {
    id: "the-adaptive-frame",
    title: "The Adaptive Frame",
    location: "Richmond, VA",
    category: "interiors",
    image: project1Hero,
    images: [
      p1_1R,
      { src: p1_2L, pair: p1_2R },
      { src: p1_3, fullSpread: true },
      { src: p1_4L, pair: p1_4R },
      { src: p1_5L, pair: p1_5R },
      { src: p1_6L, pair: p1_6R, tallImage: true },
      { src: p1_7, fullSpread: true },
      { src: p1_8, fullSpread: true },
    ],
    description:
      "An Accessory Dwelling Unit designed for dignity through transition.",
    year: "2024",
    details: [
      { label: "Type", value: "Residential" },
      { label: "Year", value: "2024" },
      { label: "Site", value: "3038 Montrose Ave, Richmond VA, 23222" },
      { label: "Client", value: "Moments of Hope" },
      { label: "Partner", value: "Storefront for Community Design" },
      { label: "Mentor", value: "Camden Whitehead" },
      { label: "Team", value: "Cassie Grimes & Mia Green" },
    ],
  },
  {
    id: "cedar-villa",
    title: "Cedar Villa",
    location: "Beirut, Lebanon",
    category: "interiors",
    image: project2,
    images: [project2, project4, project5],
    description:
      "Reimagining a heritage villa with a refined material palette. Soft textures and warm lighting honor the building's history while introducing contemporary comfort.",
    year: "2024",
  },
  {
    id: "marina-loft",
    title: "Marina Loft",
    location: "Dubai, UAE",
    category: "interiors",
    image: project3,
    images: [project3, project1, project6],
    description:
      "An open-plan loft that celebrates the intersection of dining and living. Terracotta accents and natural wood bring grounding warmth to the waterfront space.",
    year: "2023",
  },
  {
    id: "earth-vessels",
    title: "Earth Vessels",
    location: "Studio Collection",
    category: "craft",
    image: project6,
    images: [project6, project4, project2],
    description:
      "A curated collection of handcrafted ceramic vessels inspired by earth tones and organic forms. Each piece is a dialogue between material and maker.",
    year: "2024",
  },
  {
    id: "spa-retreat",
    title: "Spa Retreat",
    location: "Muscat, Oman",
    category: "interiors",
    image: project4,
    images: [project4, project5, project1],
    description:
      "A sanctuary of calm where natural stone and brass fixtures create an intimate, spa-like atmosphere. Every detail invites stillness and renewal.",
    year: "2023",
  },
  {
    id: "material-studies",
    title: "Material Studies",
    location: "Research",
    category: "research",
    image: project5,
    images: [project5, project3, project6],
    description:
      "An ongoing exploration of regional materials—clay, linen, stone—and their potential in contemporary interior applications.",
    year: "2023",
  },
];
