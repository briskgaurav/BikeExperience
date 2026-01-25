"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Chapter1Layout() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const split = new SplitText(textRef.current, { type: "chars" ,mask:'chars'})
    const chars = split.chars

    gsap.to(chars, {
      xPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: '#Chap1Layout',
        start: "top 0%",
        end: "20% top",
        markers: false,
        scrub: true,
      }
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id='Chap1Layout' className='h-screen w-full py-[5vh] flex px-[5vw] flex-col items-end justify-end absolute top-0 left-0'>
      <div ref={containerRef} className='fixed bigtext tracking-[4vw] top-[45%] left-0 w-full h-fit -translate-y-1/2 flex justify-evenly'>
        <span ref={textRef}>LIMITLESS</span>
      </div>

      <div className=' font-IBM-mono uppercase text-[1.1vw] w-[25vw] text-justify text-[#E8F2F8]'>
        Speed is not just movement, it's an experience shaped by physics.Every force, every motion, and every reaction pushes the boundaries of what's possible.
      </div>

    </section>
  )
}
