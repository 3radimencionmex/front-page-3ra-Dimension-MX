import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Materials from "@/components/Materials";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import GrainOverlay from "@/components/GrainOverlay";
import MagneticButtons from "@/components/MagneticButtons";
import PageCurtain from "@/components/PageCurtain";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import LoadingScreen from "@/components/LoadingScreen";
import AudioToggle from "@/components/AudioToggle";
import SlicerToggle from "@/components/SlicerToggle";
import EasterEgg from "@/components/EasterEgg";
import VolumeCalculator from "@/components/VolumeCalculator";
import STLViewer from "@/components/STLViewer";
import BeforeAfterSection from "@/components/BeforeAfter";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      {/* Global effects */}
      <PageCurtain />
      <Cursor />
      <GrainOverlay />
      <MagneticButtons />
      <StickyWhatsApp />
      <AudioToggle />
      <SlicerToggle />
      <EasterEgg />

      <Nav />
      <main id="main-content">
        <Hero />
        <Stats />
        <Services />
        <VolumeCalculator />
        <STLViewer />
        <Materials />
        <Process />
        <BeforeAfterSection />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
