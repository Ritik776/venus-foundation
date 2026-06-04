import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description?: string;
}

const SITE_NAME = "Venus Foundation";

function setMeta(name: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** Sets the document title and meta description per page (lightweight SEO for the SPA). */
export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    const full = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    document.title = full;
    if (description) {
      setMeta("description", description);
    }
  }, [title, description]);
}
