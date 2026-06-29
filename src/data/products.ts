// Product catalog. `id`, field names and image paths are English;
// the customer-facing copy is Hebrew.

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "general-healing-oil",
    name: "שמן מצמחי מרפא לכל הישועות",
    category: "שמנים מצמחי מרפא",
    price: 150,
    size: "30 מ״ל",
    image: "/images/products/general-healing-oil.png",
    description:
      "שמן טבעי מצמחי מרפא, נרקח בעבודת יד כחלק מסדרת השמנים של שמני המור.",
  },
  {
    id: "calming-oil",
    name: "שמן מצמחי מרפא להרגעה טבעית",
    category: "שמנים להרגעה",
    price: 150,
    size: "30 מ״ל",
    image: "/images/products/calming-oil.png",
    description:
      "שמן טבעי המיועד לתחושת רוגע, שלווה ונינוחות כחלק משגרת טיפול טבעית.",
  },
  {
    id: "face-oil",
    name: "שמן מצמחי מרפא לפנים",
    category: "טיפוח פנים",
    price: 150,
    size: "30 מ״ל",
    image: "/images/products/face-oil.png",
    description:
      "שמן טבעי לפנים, מתאים לשגרת טיפוח עדינה ומבוסס על צמחי מרפא.",
  },
  {
    id: "herbal-infusion",
    name: "חליטה מצמחי מרפא להרגעה טבעית",
    category: "חליטות",
    price: 45,
    size: "10 שקיקי חליטה",
    image: "/images/products/herbal-infusion.png",
    description:
      "חליטת צמחים טבעית לשתייה, מתאימה לרגעים רגועים ונעימים במהלך היום.",
  },
  {
    id: "oil-perfume",
    name: "בושם שמן מצמחי מרפא",
    category: "בישום טבעי",
    price: 170,
    size: "30 מ״ל",
    image: "/images/products/oil-perfume.png",
    description:
      "בושם שמן יוקרתי ועדין, המבוסס על שמנים וצמחים בניחוח טבעי.",
  },
  {
    id: "deep-skin-oil",
    name: "שמן מצמחי מרפא לטיפול עמוק בעור",
    category: "טיפוח עור",
    price: 260,
    size: "50 מ״ל",
    image: "/images/products/deep-skin-oil.png",
    description: "שמן טבעי לעור, מתאים לשגרת טיפוח ממוקדת ועדינה.",
  },
  {
    id: "mouth-oil-kit",
    name: "ערכת שמן לחלל הפה עם חליטות",
    category: "ערכות טבעיות",
    price: 120,
    size: "שמן 10 מ״ל + חליטות",
    image: "/images/products/mouth-oil-kit.png",
    description:
      "ערכה טבעית הכוללת שמן לחלל הפה לצד חליטות צמחים להרגעה טבעית.",
  },
];
