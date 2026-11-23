import type { Copy } from "@/lib/site/copy";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function applyContent(copy: Copy, form: FormData): Copy {
  const next = structuredClone(copy) as Copy;
  next.meta.title = text(form, "metaTitle") || next.meta.title;
  next.meta.description = text(form, "metaDescription") || next.meta.description;
  next.hero.lead = text(form, "lead");
  next.intro.title = text(form, "introTitle");
  next.intro.paragraphs = [text(form, "intro0"), text(form, "intro1")].filter(Boolean);

  next.cards = next.cards.map((card, index) => ({
    ...card,
    title: text(form, `card_${index}_title`) || card.title,
    text: text(form, `card_${index}_text`),
  }));

  next.spaces.items = next.spaces.items.map((space) => ({
    ...space,
    title: text(form, `space_${space.id}_title`) || space.title,
    points: lines(String(form.get(`space_${space.id}_points`) ?? "")),
  }));

  next.amenities.groups = next.amenities.groups.map((group) => {
    const items = group.items
      .map((item, index) => ({
        name: text(form, `a_${group.id}_${index}_name`),
        note: text(form, `a_${group.id}_${index}_note`) || undefined,
      }))
      .filter((item) => item.name);
    const added = text(form, `a_${group.id}_new_name`);
    if (added) {
      items.push({
        name: added,
        note: text(form, `a_${group.id}_new_note`) || undefined,
      });
    }
    return { ...group, items };
  });

  const steps = next.booking.steps
    .map((step, index) => ({
      title: text(form, `rule_${index}_title`),
      text: text(form, `rule_${index}_text`),
    }))
    .filter((step) => step.title && step.text);
  const newTitle = text(form, "rule_new_title");
  const newText = text(form, "rule_new_text");
  if (newTitle && newText) steps.push({ title: newTitle, text: newText });
  next.booking.steps = steps;
  next.booking.methods = lines(String(form.get("methods") ?? ""));

  next.place.paragraphs = [text(form, "place0"), text(form, "place1")].filter(Boolean);
  next.contact.intro = text(form, "contactIntro");
  next.contact.person = text(form, "person") || next.contact.person;
  next.contact.languages = text(form, "languages");
  const phones = [text(form, "phone0"), text(form, "phone1")]
    .filter(Boolean)
    .map((display) => ({
      display,
      href: `tel:${display.replace(/[^\d+]/g, "")}`,
    }));
  if (phones.length) next.contact.phones = phones;
  const email = text(form, "email");
  if (email) next.contact.email = email;
  return next;
}
