import { Button } from "@/components/primitives/Button";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function NotFoundPage() {
  useDocumentMeta({ title: "Page not found" });

  return (
    <section className="ihero" style={{ minHeight: "100svh" }}>
      <div className="ihero-veil" />
      <span className="ihero-grain grain" />
      <div className="wrap ihero-inner center" style={{ marginInline: "auto" }}>
        <span className="eyebrow mx-auto" style={{ justifyContent: "center" }}>
          404
        </span>
        <h1 className="display" style={{ margin: "0.2em 0 0.4em" }}>
          This path hasn't bloomed yet.
        </h1>
        <p className="lead" style={{ marginBottom: "1.6em" }}>
          The page you're looking for may have moved. Let's get you back to familiar ground.
        </p>
        <div className="cta-actions">
          <Button to="/" variant="gold" arrow>
            Back home
          </Button>
          <Button to="/our-seeds" variant="ghost" onDark>
            Explore our work
          </Button>
        </div>
      </div>
    </section>
  );
}
