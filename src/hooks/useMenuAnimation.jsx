// ============================
// #00312
// ============================

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

export function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            ".main-sidebar",
            { left: 0 },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
          ]
        ]
      : [
          [
            ".main-sidebar",
            { position: "absolute", left: "-220px" },
            { at: "-0.1" }
          ]
        ];

    animate([...menuAnimations]);
  }, [isOpen]);

  return scope;
}
