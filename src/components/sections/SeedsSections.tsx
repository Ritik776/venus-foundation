import { useEffect, useRef } from "react";
import { Chip } from "@/components/primitives/Chip";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { seedsContent } from "@/content/seeds";

export function ProgramsSection() {
  const { intro, programs } = seedsContent;
  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbImgRef = useRef<HTMLImageElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    const thumbImg = thumbImgRef.current;
    const list = listRef.current;
    if (!thumb || !thumbImg || !list || !window.matchMedia("(hover: hover)").matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const follow = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      const scale = thumb.classList.contains("show") ? 1 : 0.9;
      thumb.style.transform = `translate(${currentX - 150}px, ${currentY - 110}px) scale(${scale})`;
      raf = requestAnimationFrame(follow);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-thumb]"));
    const enterHandlers = rows.map((row) => {
      const onEnter = () => {
        const src = row.dataset.thumb ?? "";
        thumbImg.src = src;
        thumb.classList.add("show");
        thumb.style.opacity = "1";
        if (!raf) {
          raf = requestAnimationFrame(follow);
        }
      };
      const onLeave = () => {
        thumb.classList.remove("show");
        thumb.style.opacity = "0";
      };
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      return { row, onEnter, onLeave };
    });

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      for (const { row, onEnter, onLeave } of enterHandlers) {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      }
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <section className="pad surface-cream">
      <div className="wrap">
        <div style={{ marginBottom: "clamp(30px,4vw,54px)", maxWidth: "60ch" }}>
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={intro.title} />
        </div>
        <div className="programs" ref={listRef}>
          {programs.map((program) => (
            <Reveal as="a" href="#" className="program" key={program.no} data-thumb={program.thumb}>
              <div className="program-no">{program.no}</div>
              <div className="program-main">
                <Chip tone={program.tone}>{program.sdg}</Chip>
                <h3>{program.title}</h3>
              </div>
              <div className="program-side">
                <p>{program.body}</p>
                <div className="program-arrow">
                  <Icon name="arrow-right" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="program-thumb" ref={thumbRef}>
        <img
          ref={thumbImgRef}
          src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'/%3E"
          alt=""
        />
      </div>
    </section>
  );
}
