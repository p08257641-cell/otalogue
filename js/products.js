/**
 * MedROBE & Accessories by Lene - Product Catalog Data
 * Founder: Charlene Odei Asare
 * Campus: Family Health University College (FHUC), Room M306
 * Contact / WhatsApp: 0245636351 (+233 24 563 6351)
 */

const MEDROBE_PRODUCTS = [
  {
    id: "scrub-wine-elite",
    name: "Elite 4-Way Stretch Scrub Jogger Set",
    category: "scrubs",
    badge: "Bestseller",
    priceGHS: 420,
    rating: 4.9,
    reviewsCount: 48,
    image: "assets/images/scrubs-wine.jpg",
    description: "Tailored for long clinical ward rounds. Features anti-wrinkle, moisture-wicking 4-way stretch fabric with reinforced 9-pocket utility storage (including zipped badge pocket and scissor loop).",
    colors: [
      { name: "Burgundy Wine", hex: "#631d36", active: true },
      { name: "Deep Royal Navy", hex: "#1e2b4f" },
      { name: "Hunter Green", hex: "#1d4734" },
      { name: "Surgical Teal", hex: "#0f766e" },
      { name: "Charcoal Slate", hex: "#334155" },
      { name: "Lavender Lilac", hex: "#8a75a0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    features: [
      "Ultra-soft 72% Poly, 21% Rayon, 7% Spandex blend",
      "9 Functional Pockets (Chest, Cargo & Pen slots)",
      "Ribbed elastic jogger ankle cuffs & drawstring waist",
      "Antimicrobial and fluid-barrier finish",
      "Free initial name embroidery for FHUC students"
    ],
    inStock: true
  },
  {
    id: "labcoat-signature-white",
    name: "Executive Tailored Doctor Labcoat",
    category: "labcoats",
    badge: "Induction Essential",
    priceGHS: 350,
    rating: 5.0,
    reviewsCount: 62,
    image: "assets/images/labcoat.jpg",
    description: "Crisp, dignified silhouette engineered for clinical students, house officers, and practicing physicians. Features deep tablet-sized pockets, notch lapels, side access slits, and custom department crest embroidery.",
    colors: [
      { name: "Clinical Pure White", hex: "#ffffff", active: true },
      { name: "Soft Ivory White", hex: "#f8f9fa" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    features: [
      "Wrinkle-resistant twill with liquid repellent coating",
      "Dual interior oversized iPad / stethoscope pockets",
      "Tailored vented back with elegant stitched belt",
      "Optional gold/navy department & name embroidery",
      "Fade-resistant pearlized durable buttons"
    ],
    inStock: true
  },
  {
    id: "stethoscope-cardio-gold",
    name: "Acoustic Pro Cardiology Stethoscope",
    category: "diagnostics",
    badge: "High Precision",
    priceGHS: 450,
    rating: 4.9,
    reviewsCount: 39,
    image: "assets/images/stethoscope.jpg",
    description: "Dual-head acoustic stethoscope engineered with aerospace champagne-gold finished chestpiece, sensitive tunable diaphragm, and dual-lumen sound-isolating tubing. Accurately captures high & low frequency cardiac sounds.",
    colors: [
      { name: "Champagne Gold & Matte Black", hex: "#d4af37", active: true },
      { name: "Rose Gold & Navy", hex: "#b76e79" },
      { name: "All-Black Stealth Edition", hex: "#111827" }
    ],
    sizes: ["Standard 27-inch clinical length"],
    features: [
      "Precision-machined dual frequency chestpiece",
      "Ultra-comfortable soft-sealing silicone ear tips (3 sizes included)",
      "Non-chill rim for optimal patient comfort",
      "Next-generation tubing resistant to skin oils & alcohol",
      "Includes spare diaphragm, ear tips & protective case"
    ],
    inStock: true
  },
  {
    id: "glucometer-kit-digital",
    name: "Instant Digital Blood Glucose Monitoring System",
    category: "diagnostics",
    badge: "Campus Favorite",
    priceGHS: 290,
    rating: 4.8,
    reviewsCount: 31,
    image: "assets/images/glucometer.jpg",
    description: "Fast, laboratory-accurate blood sugar readings in under 4 seconds with a tiny 0.6µL micro-sample. Complete portable kit equipped with test strips, painless comfort lancing pen, sterile lancets, and hard shell travel pouch.",
    colors: [
      { name: "Clinical Slate Grey", hex: "#475569", active: true }
    ],
    sizes: ["Complete Diagnostic Pack"],
    features: [
      "Large backlit high-contrast LCD screen",
      "500-test memory with 7, 14, 30 & 90-day averages",
      "No coding required (Automatic calibration)",
      "Includes 50 Test Strips + 50 Sterile Lancets + Lancing Device",
      "Compact EVA shockproof zip organizer"
    ],
    inStock: true
  },
  {
    id: "medkit-student-complete",
    name: "FHUC Complete Clinical Diagnostic Kit",
    category: "kits",
    badge: "Full Kit Deal",
    priceGHS: 580,
    rating: 5.0,
    reviewsCount: 74,
    image: "assets/images/medkit.jpg",
    description: "The all-in-one clinical starter bundle designed specifically for Family Health University College medical, nursing, and physician assistant trainees. Everything required for clinical rotations and OSCE exams.",
    colors: [
      { name: "Classic Onyx Black", hex: "#0f172a", active: true },
      { name: "Navy Blue Case", hex: "#1e3a8a" }
    ],
    sizes: ["Full 7-Piece Clinical Set"],
    features: [
      "Aneroid Blood Pressure Sphygmomanometer with calibrated cuff",
      "Dual-head Acoustic Clinical Stethoscope",
      "Percussion Taylor Reflex Hammer (weighted balance)",
      "C128 Hz Medical Tuning Fork for neurological tests",
      "LED Pupil Gauge Diagnostic Penlight (battery included)",
      "Fluoride-coated Medical Trauma Shears",
      "Heavy-duty padded tactical organizer bag with hand strap"
    ],
    inStock: true
  },
  {
    id: "accessories-essentials-pack",
    name: "Medical Essentials & Designer Scrub Caps Pack",
    category: "accessories",
    badge: "Top Add-on",
    priceGHS: 140,
    rating: 4.9,
    reviewsCount: 56,
    image: "assets/images/accessories.jpg",
    description: "Custom printed designer scrub caps with sweatband & button attachments, heavy-duty retractable glitter badge reels, rose gold trauma shears, and clinical silicone fob watch.",
    colors: [
      { name: "Floral & Aqua Print", hex: "#0ea5e9", active: true },
      { name: "Heartbeat Medical Caduceus", hex: "#e11d48" },
      { name: "Geometric Teal & Gold", hex: "#0f766e" }
    ],
    sizes: ["Universal Adjustable Tie-Back"],
    features: [
      "100% Breathable cotton scrub cap with built-in forehead towel band",
      "Side buttons to relieve mask ear pressure",
      "Heavy-duty steel wire retractable ID badge reel",
      "Titanium-bonded curved safety medical shears",
      "Infection-control washable medical silicone watch"
    ],
    inStock: true
  }
];

const REVIEWS_DATA = [
  {
    author: "Dr. Kwesi Amponsah",
    role: "House Officer (FHUC Alumnus)",
    avatar: "KA",
    rating: 5,
    date: "1 week ago",
    comment: "The Burgundy Wine jogger scrub set from MedROBE is by far the most comfortable pair I've worn during 36-hour call duty. Breathable, durable, and the custom embroidery gave it that executive look. Charlene delivered right on campus!"
  },
  {
    author: "Akua Mansa Boakye",
    role: "Year 4 Medical Student, FHUC",
    avatar: "AB",
    rating: 5,
    date: "2 weeks ago",
    comment: "Got the Complete Clinical Kit for my internal medicine rotation. The stethoscope acoustics and BP monitor are top-tier. Picking it up directly at Room M306 was so easy. 10/10 recommend to all FHMS juniors!"
  },
  {
    author: "Nurse Priscilla Osei",
    role: "Senior Staff Nurse, Family Health Hospital",
    avatar: "PO",
    rating: 5,
    date: "3 weeks ago",
    comment: "The labcoat fits like a glove and stays crisp all shift. Stain resistant and deep pockets for my notepad and thermometer. Charlene’s attention to detail is unmatched."
  },
  {
    author: "Emmanuel Darko",
    role: "Physician Assistant Student",
    avatar: "ED",
    rating: 5,
    date: "A month ago",
    comment: "Best medical gear vendor in Teshie! The glucometer kit was fast and calibrated accurately against the hospital lab analyzer. Ordering via WhatsApp was super fast."
  }
];
