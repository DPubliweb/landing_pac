import React, { useEffect } from "react";
import HeroSection from "../components/landing/HeroSection";
import ComfortSection from "../components/landing/ComfortSection";
import BenefitsGrid from "../components/landing/BenefitsGrid";
import AdvantagesSection from "../components/landing/AdvantagesSection";
import FinalCTA from "../components/landing/FinalCTA";
import FAQ from "../components/landing/FAQ";
import CTAButton from "../components/landing/CTAButton";

export default function Home() {
  useEffect(() => {
    // Load Manrope font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Rubik:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const ctaTexts = [
    "Utiliser mes aides",
    "J'en profite"
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <HeroSection />
      <ComfortSection />
      <CTAButton text={ctaTexts[0]} />
      <BenefitsGrid />
      <AdvantagesSection />
      <CTAButton text={ctaTexts[1]} />
      <FinalCTA />
      <FAQ />
    </div>
  );
}