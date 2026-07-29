// Product catalog. `id`, field names and image paths are English;
// the customer-facing copy is Hebrew.

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  /** Volume / contents. Omitted for products sold without a stated size. */
  size?: string;
  /** Scent blends the customer picks from before ordering, if any. */
  scents?: string[];
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
      "שמן טבעי לשימוש חיצוני המיועד לתחושת רוגע, שלווה, הפחתת חרדה ושיפור השינה.",
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
    description:
      "שמן טבעי לעור הפועל בשלושה רבדים, הנפשי, הפנימי והחיצוני, לשימוש חיצוני בלבד",
  },
  {
    id: "mouth-oil-kit",
    name: "ערכת שמן לחלל הפה עם חליטות",
    category: "ערכות טבעיות",
    price: 120,
    size: "שמן 10 מ״ל + חליטות",
    image: "/images/products/mouth-oil-kit.png",
    description:
      "ערכה טבעית הכוללת שמן למריחה בחלל הפה לניקוי, חיטוי והלבנת השיניים לצד חליטות צמחים להרגעה טבעית.",
  },
  {
    id: "hormonal-calm-oil",
    name: "שמן רוגע הורמונלי",
    category: "צמחי מרפא",
    price: 52,
    size: "30 מ״ל",
    image: "/images/products/hormonal-calm-oil.png",
    description:
      "שמן טבעי מצמחי מרפא לשימוש חיצוני, תמצית לנשים כהכנה להריון עוזר לאיזון וחיזוק המערכת ההורמונלית בגוף",
  },
  {
    id: "scent-diffuser",
    name: "מפיץ ריח מצמחי מרפא",
    category: "מפיצי ריח",
    price: 120,
    scents: ["תערובת בניחוח ורדים", "תערובת בניחוח יסמין"],
    image: "/images/products/scent-diffuser.png",
    description:
      "מפיץ ריח בעבודת יד, המשלב תמציות ורכיבים ארומטיים מצמחי מרפא ליצירת אווירה נעימה, רכה ומזמינה בחלל. זמין בשתי תערובות ניחוח: ורדים ויסמין.",
  },
];
