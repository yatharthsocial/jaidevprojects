import About from "@/components/About";
import Facilities from "@/components/Facilities";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import WhyInvest from "@/components/WhyInvest";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Facilities />
      <WhyInvest />
      <Location />
    </main>
  );
}
