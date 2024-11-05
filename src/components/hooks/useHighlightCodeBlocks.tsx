import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-light.css";

hljs.configure({
  cssSelector: ".ql-code-block",
  ignoreUnescapedHTML: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useHighlightCodeBlocks = (post: any) => {
  useEffect(() => {
    if (post) {
      document.querySelectorAll(".ql-code-block-container").forEach((block) => {
        block.classList.add("custom-code-block-container");
      });

      document.querySelectorAll(".ql-code-block").forEach((block) => {
        const element = block as HTMLElement;
        delete element.dataset.highlighted;
        const language = element.getAttribute("data-language") || "plaintext";
        element.classList.add(`language-${language}`);
      });

      document.querySelectorAll("code").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });

      hljs.highlightAll();
    }
  }, [post]);
};
