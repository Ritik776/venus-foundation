import type { MutableRefObject, Ref, RefCallback } from "react";

/** Combine several refs into one callback ref so a node can be shared by multiple hooks. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    }
  };
}
