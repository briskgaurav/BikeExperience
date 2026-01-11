import Chapter1 from "@/components/Chapter1/Chapter1";
import ScrollBarCustom from "@/components/Lenis/Scrollbar";
import React from "react";

export default function page() {
  return (
    <>
      <ScrollBarCustom />
      <section id="chapter1" className="h-[1000vh] w-screen bg-black">
        <Chapter1 />
      </section>
    </>
  );
}
