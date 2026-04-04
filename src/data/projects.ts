const _booksModules = import.meta.glob<{ default: string }>(
  "../assets/project2-images/BOOKS/*.jpg",
  { eager: true }
);
const booksImages: string[] = Object.entries(_booksModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/P(\d+)/)?.[1] ?? "0");
    const numB = parseInt(b.match(/P(\d+)/)?.[1] ?? "0");
    return numA - numB;
  })
  .map(([, m]) => m.default);

import project1Hero from "@/assets/project1-images/LIVING ROOM UPDATED.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project2-images/PROJECT 2 COVER IMAGE.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

// Project 1 — The Adaptive Frame
import p1_1R from "@/assets/project1-images/LIVING ROOM UPDATED CROPPED.png";
import p1_2L from "@/assets/project1-images/Page_2_L.jpg";
import p1_2R from "@/assets/project1-images/Page_2_R.jpg";
import p1_3 from "@/assets/project1-images/Page_3.jpg";
import p1_4L from "@/assets/project1-images/AG_ADU_KITCHEN CROPPED.png";
import p1_4R from "@/assets/project1-images/Page_4_R.jpg";
import p1_5L from "@/assets/project1-images/AG_ADU_BEDROOM CROPPED.png";
import p1_5R from "@/assets/project1-images/Page_5_R.jpg";
import p1_6L from "@/assets/project1-images/AG_ADU_BATHROOM CROPPED.png";
import p1_6R from "@/assets/project1-images/Adaptive_Frame_Page_6_R.jpg";
import p1_7 from "@/assets/project1-images/Page_7.jpg";
import p1_8 from "@/assets/project1-images/Page_8.jpg";

// Project 2 — The Mind's Eye
import p2Hero from "@/assets/project2-images/LINKEDINPROFILEIMAGE.jpg";
import p2_1L from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_1_L.jpg";
import p2_1R from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_1_R.jpg";
import p2_3L from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_3_L.jpg";
import p2_3R from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_3_R.jpg";
import p2_4L from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_4_L.jpg";
import p2_4R from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_4_R.jpg";
import p2_5L from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_5_L.jpg";
import p2_5R from "@/assets/project2-images/THE MINDS EYE/Individual Images/Minds_Eye_Page_5_R.jpg";
import p2_bookSketch from "@/assets/project2-images/Book sketch.png";
import p2_conceptSection2 from "@/assets/project2-images/CONCEPT SECTION 2.png";
import p2_img012 from "@/assets/project2-images/img012.jpg";
import p2_sc001 from "@/assets/project2-images/SECTION CUT POTETICS OF SPACE/img001.jpg";
import p2_sc002 from "@/assets/project2-images/SECTION CUT POTETICS OF SPACE/img002.jpg";
import p2_sc003 from "@/assets/project2-images/SECTION CUT POTETICS OF SPACE/img003.jpg";
import p2_sc004 from "@/assets/project2-images/SECTION CUT POTETICS OF SPACE/img004.jpg";
import p2_sc005 from "@/assets/project2-images/SECTION CUT POTETICS OF SPACE/img005.jpg";
import p2_sc006 from "@/assets/project2-images/SECTION CUT POTETICS OF SPACE/img006.jpg";
import p2_q1 from "@/assets/project2-images/Minds_Eye_Page_3_Q1.jpg";
import p2_q4 from "@/assets/project2-images/Minds_Eye_Page_3_Q4.jpg";
import p2_zoomedInstallation from "@/assets/project2-images/zoomed in installation.jpg";

// Project 2 — Phase 2 SET images
import p2_set1  from "@/assets/project2-images/SET 1.1.png";
import p2_set2  from "@/assets/project2-images/SET 2.1.png";
import p2_set3  from "@/assets/project2-images/SET 3.1.png";
import p2_set4  from "@/assets/project2-images/SET 4.1.png";
import p2_set6  from "@/assets/project2-images/SET 6.1.png";
import p2_set7  from "@/assets/project2-images/SET 7.1.png";
import p2_set8  from "@/assets/project2-images/SET 8.1.png";
import p2_set9  from "@/assets/project2-images/SET 9.1.png";
import p2_set10 from "@/assets/project2-images/SET 10.1.png";
import p2_set11 from "@/assets/project2-images/SET 11.1.png";
export interface ProjectImage {
  src: string;
  /** If set, this image is displayed side-by-side with a paired image */
  pair?: string;
  caption?: string;
  /** Caption for the paired (right) image when it differs from caption */
  captionPair?: string;
  /** Full double-page landscape spread — renders at full width */
  fullSpread?: boolean;
  /** Portrait image that should match the width of standard landscape pages, allowing it to be taller */
  tallImage?: boolean;
  /** Render at the measured width of a single concept page image */
  conceptWidth?: boolean;
}

export interface ProjectImageGroup {
  type: "group";
  items: { src: string; caption: string }[];
  title: string;
  text: string;
  carousel?: string[];
  carouselText?: string;
  carousel2?: string[];
}

export interface ProjectImagePortraitPair {
  type: "portraitPair";
  left: string;
  right: string;
  captionLeft?: string;
  captionRight?: string;
}

export interface ProjectImageGrid {
  type: "grid";
  columns: number;
  items: { src: string; caption: string }[];
}

export type ProjectImageEntry = string | ProjectImage | ProjectImageGroup | ProjectImagePortraitPair | ProjectImageGrid;

export interface ProjectDetail {
  label: string;
  value: string;
}

export interface ProjectPhase {
  label: string;
  images: ProjectImageEntry[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: "interiors" | "craft" | "research";
  image: string;
  images: ProjectImageEntry[];
  phases?: ProjectPhase[];
  description: string;
  year: string;
  details?: ProjectDetail[];
  body?: string;
  /** Hidden reference image whose rendered width sets the page-width for this project */
  referenceImageSrc?: string;
}

export const projects: Project[] = [
  {
    id: "the-adaptive-frame",
    title: "The Adaptive Frame",
    location: "Richmond, VA",
    category: "interiors",
    image: project1Hero,
    images: [
      { src: p1_1R, caption: "Living Room Render, Morning Light" },
      { src: p1_2L, pair: p1_2R, caption: "Site Plan", captionPair: "Floor Plan" },
      { src: p1_3, fullSpread: true, caption: "Building Section" },
      { src: p1_4L, pair: p1_4R, caption: "Kitchen Render, Morning Light", captionPair: "Kitchen Elevation" },
      { src: p1_5L, pair: p1_5R, caption: "Bedroom Render, Evening Light", captionPair: "Bedroom Elevation 01" },
      { src: p1_6L, pair: p1_6R, tallImage: true, caption: "Bathroom Render", captionPair: "Bathroom Elevation 01 + 02" },
      { src: p1_7, fullSpread: true, caption: "Roof Studies" },
      { src: p1_8, fullSpread: true, caption: "Dwelling in Transition: An exploration of how everyday rituals construct the experience of home" },
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
    id: "the-minds-eye",
    title: "The Mind's Eye",
    location: "",
    category: "interiors",
    image: project2,
    images: [
      { src: p2_3L, pair: p2_3R },
      { src: p2_4L, pair: p2_4R },
      { src: p2_5L, pair: p2_5R },
    ],
    phases: [
      {
        label: "Phase 1",
        images: [
          {
            type: "group",
            items: [
              { src: p2_bookSketch,       caption: "Conceptual Section Cut of a Book" },
              { src: p2_conceptSection2,  caption: "Conceptual Section Cut of Page Describing the Writing Process" },
              { src: p2_img012,           caption: "Conceptual Section Cut of Page 12 in The Poetics of Space." },
            ],
            title: "",
            text: "Sequential sectional mapping as a lens into the miniature world, where imagination operates outside the limits of ordinary perception.",
            carousel: [p2_sc001, p2_sc002, p2_sc003, p2_sc004, p2_sc005, p2_sc006],
            carouselText: "The same section cut method applied to all 278 pages of The Poetics of Space. Each page produces a different result. Repetition is not sameness.",
            carousel2: booksImages,
          },
          { src: p2_q4, conceptWidth: true, caption: "Section Cut Methodology" },
          { type: "portraitPair", left: p2_q1, right: p2_zoomedInstallation, captionLeft: "135 Page (Double-Sided) Installation Located In Stairwell", captionRight: "Installation Close Up" },
        ],
      },
      {
        label: "Phase 2",
        images: [
          {
            type: "grid",
            columns: 5,
            items: [
              { src: p2_set1,  caption: "Apartment Iteration 1" },
              { src: p2_set2,  caption: "Apartment Iteration 2" },
              { src: p2_set3,  caption: "Apartment Iteration 3" },
              { src: p2_set4,  caption: "Apartment Iteration 4" },
              { src: p2_set6,  caption: "Apartment Iteration 5" },
              { src: p2_set7,  caption: "Apartment Iteration 6" },
              { src: p2_set8,  caption: "Apartment Iteration 7" },
              { src: p2_set9,  caption: "Apartment Iteration 8" },
              { src: p2_set10, caption: "Apartment Iteration 9" },
              { src: p2_set11, caption: "Apartment Iteration 10" },
            ],
          },
          { src: p2_4L, pair: p2_4R },
          { src: p2_5L, pair: p2_5R },
        ],
      },
    ],
    description: "A study of repetition and perception across miniature and macro worlds.\n\n\"We are inclined to think that the narrator would have been more cautious had he had to describe an object with ordinary dimensions. But he entered into a miniature world and right away images began to abound, then grow, then escape. Large issues from small, not through the logical law of a dialectics of contraries, but thanks to liberation from all obligations of dimensions, a liberation that is a special characteristic of the activity of the imagination.\"\n— Gaston Bachelard",
    year: "2023",
    details: [
      { label: "Type", value: "Exhibition" },
      { label: "Featured In", value: "Qualia" },
      { label: "Year", value: "2023" },
    ],
    body: "The Mind's Eye examines how perception constructs meaning through repetition and iteration. Shifting between scales, formats, and sequences, the project reveals that understanding space is inseparable from how we see and imagine it. Moving between miniature and macro worlds, it questions the boundaries of observation and imagination, suggesting that every act of seeing is also an act of interpretation.",
    referenceImageSrc: p1_2L,
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
