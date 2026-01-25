import Chapter1 from "@/components/Experience/WholeExperince";
import Chapter1Layout from "@/components/UI/Chapter1Layout";
import ScrollBarCustom from "@/components/Lenis/Scrollbar";
import React from "react";

export default function page() {
  return (
    <>

      <ScrollBarCustom />
      <Chapter1 />
      <Chapter1Layout />
      <ScrollBarCustom />
    </>
  );
}
