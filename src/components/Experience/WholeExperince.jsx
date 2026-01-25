"use client";
import React from "react";
import FrostedTransition from "./FrostedTransitions";
import Formula1 from "./Chapters/Formula1";
import Engine from "./Chapters/Engine";
import Scene3 from "./Chapters/Scene3";
import Scene4 from "./Chapters/Scene4";
import Scene5 from "./Chapters/Scene5";

export default function WholeExperience() {
  const scenes = [
    <Formula1 key="scene1" />,
    <Engine key="scene2" />,
    <Scene3 key="scene3" />,
    <Scene4 key="scene4" />,
    <Scene5 key="scene5" />,
  ];

  return (
    <FrostedTransition

      scenes={scenes}
      height="1500vh"
      showStats={true}
      sectionId="chapter1"
    />
  );
}
