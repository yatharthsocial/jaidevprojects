import About from "@/components/About";
import Contact from "@/components/Contact";
import Facilities from "@/components/Facilities";
import Faq from "@/components/Faq";
import FloorPlans from "@/components/FloorPlans";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import LeadPopup from "@/components/LeadPopup";
import Location from "@/components/Location";
import Progress from "@/components/Progress";
import WhyInvest from "@/components/WhyInvest";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <WhyInvest />
        <Facilities />
        <FloorPlans />
        <Location />
        <Gallery />
        <Progress />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <LeadPopup />
    </>
  );
}
