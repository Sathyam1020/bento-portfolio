"use client";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

export default function SkillsAnimation() {
  return (
    <div className="w-full h-full">
      <LottiePlayer
        autoplay
        loop
        src="/animations/animationcat.json"
        className="w-full h-full"
      />
    </div>
  );
}
