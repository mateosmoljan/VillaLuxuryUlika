const word: Record<string, string> = {
  hr: "fotografija",
  en: "photo",
  de: "Foto",
  it: "foto",
};

export function villaPhotoAlt(locale: string, index: number) {
  return `Villa Luxury Ulika, ${word[locale] ?? word.en} ${index}`;
}
