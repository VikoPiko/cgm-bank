"use client";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";
import i18n from "@/lib/i18n/i18n";
import { useTranslation } from "react-i18next";

export const VelocityText = () => {
  const targetRef = useRef(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["15deg", "-15deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  // Ensure text starts at the beginning and moves smoothly
  const xRaw = useTransform(scrollYProgress, [0, 1], [100, -5500]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  // slogan = t()

  return (
    <section
      ref={targetRef}
      className="h-[80vh] -mt-64 bg-transparent dark:text-white text-neutral-950"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap text-5xl font-black uppercase leading-[0.85] md:text-7xl md:leading-[0.85]"
        >
          {`" ${t("trustSlogan")} "`}
        </motion.p>
      </div>
    </section>
  );
};
