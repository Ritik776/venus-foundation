import { FeaturedPosts, LatestPosts, NewsletterCta } from "@/components/sections/BlogSections";
import { InnerHero } from "@/components/sections/Shared";
import { blogHero } from "@/content/blog";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function BlogPage() {
  useDocumentMeta({
    title: "Blog | Stories, CSR & Impact",
    description:
      "Stories from Venus Foundation on CSR projects, education, healthcare, women empowerment and community development in Panchkula and Haryana.",
  });

  return (
    <>
      <InnerHero
        image={blogHero.image}
        breadcrumb={blogHero.breadcrumb}
        eyebrow={blogHero.eyebrow}
        words={blogHero.words}
        subtitle={blogHero.subtitle}
      />
      <FeaturedPosts />
      <LatestPosts />
      <NewsletterCta />
    </>
  );
}
