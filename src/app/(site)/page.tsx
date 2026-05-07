import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { DigitalUpgrade } from "@/components/DigitalUpgrade";
import { PainPoints } from "@/components/PainPoints";
import { Services } from "@/components/Services";
import { Cases } from "@/components/Cases";
import { WhyUs } from "@/components/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <DigitalUpgrade />
      <PainPoints />
      <Services />
      <Cases />
      <WhyUs />
    </>
  );
}
