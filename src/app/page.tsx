import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatStrip from "@/components/StatStrip";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import IsometricCity from "@/components/IsometricCity";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <StatStrip />
        <Skills />
        <Experience />
        <IsometricCity />
        <Contact />
      </main>
      <footer className="footer">Kaitlyn Gledhill &nbsp;·&nbsp; 2026</footer>
    </>
  );
}