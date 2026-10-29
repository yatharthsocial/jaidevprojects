import About from "@/components/About";
import Contact from "@/components/Contact";
import Facilities from "@/components/Facilities";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import LeadPopup from "@/components/LeadPopup";
import Location from "@/components/Location";
import WhyInvest from "@/components/WhyInvest";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Facilities />
        <WhyInvest />
        <Location />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <LeadPopup />
    </>
  );
}
