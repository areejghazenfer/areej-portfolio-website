import project1Hero from "@/assets/AG_ADU_LIVINGROOM2.png";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: "interiors" | "craft" | "research";
  image: string;
  images: string[];
  description: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "al-raha-residence",
    title: "Al Raha Residence",
    location: "Abu Dhabi, UAE",
    category: "interiors",
    image: project1Hero,
    images: [project1Hero, project2, project3],
    description: "A contemporary family home blending traditional Emirati warmth with modern minimalism. Natural materials and earthy palettes create an inviting atmosphere throughout.",
    year: "2024",
  },
  {
    id: "cedar-villa",
    title: "Cedar Villa",
    location: "Beirut, Lebanon",
    category: "interiors",
    image: project2,
    images: [project2, project4, project5],
    description: "Reimagining a heritage villa with a refined material palette. Soft textures and warm lighting honor the building's history while introducing contemporary comfort.",
    year: "2024",
  },
  {
    id: "marina-loft",
    title: "Marina Loft",
    location: "Dubai, UAE",
    category: "interiors",
    image: project3,
    images: [project3, project6],
    description: "An open-plan loft that celebrates the intersection of dining and living. Terracotta accents and natural wood bring grounding warmth to the waterfront space.",
    year: "2023",
  },
  {
    id: "earth-vessels",
    title: "Earth Vessels",
    location: "Studio Collection",
    category: "craft",
    image: project6,
    images: [project6, project4, project2],
    description: "A curated collection of handcrafted ceramic vessels inspired by earth tones and organic forms. Each piece is a dialogue between material and maker.",
    year: "2024",
  },
  {
    id: "spa-retreat",
    title: "Spa Retreat",
    location: "Muscat, Oman",
    category: "interiors",
    image: project4,
    images: [project4, project5],
    description: "A sanctuary of calm where natural stone and brass fixtures create an intimate, spa-like atmosphere. Every detail invites stillness and renewal.",
    year: "2023",
  },
  {
    id: "material-studies",
    title: "Material Studies",
    location: "Research",
    category: "research",
    image: project5,
    images: [project5, project3, project6],
    description: "An ongoing exploration of regional materials—clay, linen, stone—and their potential in contemporary interior applications.",
    year: "2023",
  },
];
