const _booksModules = import.meta.glob<{ default: string }>(
  "../assets/project2-images/BOOKS/*.{jpg,png}",
  { eager: true }
);
const booksImages: string[] = Object.entries(_booksModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/[/\\]P?(\d+)\.[a-z]+$/i)?.[1] ?? "0");
    const numB = parseInt(b.match(/[/\\]P?(\d+)\.[a-z]+$/i)?.[1] ?? "0");
    return numA - numB;
  })
  .map(([, m]) => m.default);

import project1Hero from "@/assets/project1-images/LIVING ROOM UPDATED.png";
import project1 from "@/assets/project1-images/LIVING ROOM UPDATED.png";
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
import p2_geometry from "@/assets/project2-images/Geometry.png";

// Project 3 — Mirrored Days
import p3_adultForts    from "@/assets/project3-images/ADULT FORTS.png";
import p3_adultTreeHouse from "@/assets/project3-images/ADULT TREE HOUSE.png";
import p3_jungleGym     from "@/assets/project3-images/JUNGLE GYM.png";
import p3_playground    from "@/assets/project3-images/PLAYGROUND KIDS.png";
import p3_kidsHouses    from "@/assets/project3-images/KIDS HOUSES.png";
import p3_slide              from "@/assets/project3-images/SLIDE.png";
import p3_mirroredDaysFull   from "@/assets/project3-images/Mirrored_Days_Page_3_Full.jpg";

// Project 2 — Phase 2 Model images
import p2_model0 from "@/assets/project2-images/Models/0 (1).jpg";
import p2_model1 from "@/assets/project2-images/Models/1 (1).jpg";
import p2_model2 from "@/assets/project2-images/Models/2 (1).jpg";

// Project 2 — Installation images
import p2_inst3  from "@/assets/project2-images/2023_1212_INSTALLATION_3.png";
import p2_inst5  from "@/assets/project2-images/2023_1212_INSTALLATION_5.png";
import p2_inst6  from "@/assets/project2-images/2023_1212_INSTALLATION_6.png";
import p2_inst12 from "@/assets/project2-images/2023_1212_INSTALLATION_12.png";

// Project 4 — Common Thread
import p4_page1R    from "@/assets/project4-images/Common_Thread_Page_1_R.jpg";
import p4_page2Full from "@/assets/project4-images/Common_Thread_Page_2_Full.jpg";
import p4_page3Full from "@/assets/project4-images/Common_Thread_Page_3_Full.jpg";
import p4_page4Full from "@/assets/project4-images/Common_Thread_Page_4_Full.jpg";
import p4_page4Render from "@/assets/project4-images/Common_Thread_Page_4_Render.jpg";
import p4_page4Wall from "@/assets/project4-images/Common_Thread_Page_4_Wall.jpg";
import p4_page6    from "@/assets/project4-images/Weyanoke_Page_6.jpg";
import p4_page7    from "@/assets/project4-images/Weyanoke_Page_7.jpg";
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
  text?: string;
  cellAspectRatio?: string;
  fitHeight?: boolean;
}

export interface ProjectImageSideGroup {
  type: "sideGroup";
  leftImages: { src: string; caption?: string }[];
  rightImage: { src: string; caption?: string };
}

export interface ProjectProgramItem {
  number: string;
  name: string;
}

export interface ProjectImageWithProgram {
  type: "imageWithProgram";
  src: string;
  programTitle: string;
  programGroups: ProjectProgramItem[][];
}

export interface ProjectImageAnnotated {
  type: "annotated";
  src: string;
  caption?: string;
  leftAnnotations: { text: string; topPercent: number }[];
  rightAnnotations: { text: string; topPercent: number }[];
}

export type ProjectImageEntry = string | ProjectImage | ProjectImageGroup | ProjectImagePortraitPair | ProjectImageGrid | ProjectImageSideGroup | ProjectImageWithProgram | ProjectImageAnnotated;

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
  /** Program list rendered at the top of the right column */
  programList?: { title: string; groups: ProjectProgramItem[][] };
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
    ],
    phases: [
      {
        label: "The Miniature",
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
        label: "The Macro",
        images: [
          {
            type: "grid",
            columns: 1,
            fitHeight: true,
            text: "This study examines how format shapes the perception of space through the creation of miniature environments. By extending beyond the scale of the human eye, the work reveals how multiple versions of a space can exist and be understood at once. Each abstract form remains open to interpretation, allowing perception and experience to influence how the space is read and engaged.",
            items: [
              { src: p2_geometry, caption: "" },
            ],
          },
          { src: p2_model0, conceptWidth: true },
          { src: p2_model1, conceptWidth: true },
          { src: p2_model2, conceptWidth: true },
          {
            type: "sideGroup",
            leftImages: [
              { src: p2_inst3 },
              { src: p2_inst5 },
            ],
            rightImage: { src: p2_inst6 },
          },
          { src: p2_inst12, conceptWidth: true },
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
    id: "mirrored-days",
    title: "Mirrored Days",
    location: "Richmond, VA",
    category: "interiors",
    image: p3_jungleGym,
    images: [
      { src: p3_adultTreeHouse, conceptWidth: true, caption: "#18 Adult Tree House" },
      { src: p3_jungleGym,      conceptWidth: true, caption: "#14 Adult Buzzi Jungle Gym" },
      { type: "portraitPair", left: p3_adultForts, right: p3_slide, captionLeft: "#19-21 Adult Fort Offices", captionRight: "#17 Puzzle Poof Seating" },
      { src: p3_kidsHouses,     conceptWidth: true, caption: "#27 Children Activity Space" },
      { src: p3_playground,     conceptWidth: true, caption: "#29 Children's Indoor Playground" },
      { src: p3_mirroredDaysFull, conceptWidth: true },
    ],
    description: "A Montessori-inspired co-working and childcare space for shared growth.",
    year: "2024",
    details: [
      { label: "Type", value: "Commercial" },
      { label: "Year", value: "2024" },
      { label: "Site", value: "3121 W Broad St, Richmond, VA 23230" },
    ],
    body: "Mirrored Days explores how environments can nurture both productivity and play through shared rhythm and spatial empathy. The project mirrors the daily routines of adults and children, inviting balance between structure and imagination. By reinterpreting Montessori principles at multiple scales, it proposes a workspace that values curiosity, connection, and growth as experiences shared across age.",
    referenceImageSrc: p1_2L,
    programList: {
      title: "Program:",
      groups: [
        [
          { number: "01", name: "0-16 Months" },
          { number: "02", name: "16- 30 Months" },
          { number: "03", name: "Family Restroom" },
          { number: "04", name: "Staff Lounge" },
          { number: "05", name: "Women's Restroom" },
          { number: "06", name: "Men's Restroom" },
          { number: "07", name: "Storage" },
          { number: "08 - 09", name: "Nursing" },
          { number: "10 - 11", name: "Small Conference Rooms" },
          { number: "12", name: "Reception" },
          { number: "13", name: "Cafeteria" },
          { number: "14", name: "Buzzi Jungle" },
          { number: "15", name: "Swings" },
          { number: "16", name: "Janitor's Closet" },
          { number: "17", name: "Puzzle Poof Seating" },
          { number: "18", name: "Tree House" },
          { number: "19 - 21", name: "Fort Offices" },
          { number: "22", name: "Lounge" },
          { number: "23", name: "Meditation/ Reflection Space" },
          { number: "24", name: "Quiet Space" },
          { number: "25", name: "Large Conference Rooms" },
          { number: "26", name: "Kid's Restroom" },
          { number: "27", name: "Activity Space" },
          { number: "28", name: "Reading Space" },
          { number: "29", name: "Indoor Playground" },
          { number: "30", name: "Children's Dining" },
        ],
      ],
    },
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
    id: "common-thread",
    title: "The Common Thread",
    location: "Richmond, VA",
    category: "interiors",
    image: p4_page6,
    description: "A courtyard performance space where movement weaves community together.",
    year: "2024",
    details: [
      { label: "Client", value: "The Weyanoke Association" },
      { label: "Site", value: "325 N. Harrison, Richmond VA, 23284" },
    ],
    body: "The Common Thread explores connection as a living rhythm, a pulse shared between individuals and the spaces they inhabit. Rooted in the metaphor of the heart, the project examines how movement, form, and gathering intertwine to create collective presence. Through this rhythm, architecture reveals how community is both shaped and sustained by connection.",
    images: [
      { src: p4_page2Full,  conceptWidth: true },
      { src: p4_page3Full,  conceptWidth: true },
      { src: p4_page4Wall,  conceptWidth: true },
      { src: p4_page4Render, conceptWidth: true },
      { src: p4_page1R,     conceptWidth: true },
    ],
    referenceImageSrc: p1_2L,
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
