"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const HeroImage = () => {
  return (
    <div className="grid w-full place-content-end translate-y-20">
      <TiltCard />
    </div>
  );
};

const ROTATION_RANGE = 32;
const HALF_ROTATION_RANGE = 32 / 2;

const TiltCard = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.2 }} // Smooth transition
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-72 rounded-xl"
    >
      {/* Background Image */}
      <motion.img
        src="/Frame2.png"
        alt="Frame2"
        className="absolute inset-0 w-full h-full object-fill rounded-xl"
        style={{
          transform:
            "translateZ(-50px) scale(1.25) translateX(-65px) translateY(10px)",
        }}
      />

      {/* Foreground Image */}
      <motion.img
        src="/Frame1.png"
        alt="Frame1"
        className="absolute inset-0 w-full h-full object-fill rounded-lg"
        style={{
          transform:
            "translateZ(50px) scale(1.0) translateX(-10px) translateY(10px)",
        }}
      />
    </motion.div>
  );
};

export default HeroImage;
