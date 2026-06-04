import {
  ClosingCta,
  ContactHero,
  FaqSection,
  MapEmbed,
} from "@/components/sections/ContactSections";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function ContactPage() {
  useDocumentMeta({
    title: "Contact | NGO in Panchkula",
    description:
      "Reach out to Venus Foundation in Panchkula, Haryana for volunteering, donations, partnerships and community support initiatives.",
  });

  return (
    <>
      <ContactHero />
      <MapEmbed />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
