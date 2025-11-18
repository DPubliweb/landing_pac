import React from "react";
import EligibilityForm from "./EligibilityForm";

export default function HeroSection() {
  return (
    <section className="py-2 md:py-8 px-3 md:px-6" style={{ backgroundColor: '#FAF8DF' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Top Bar with Official Logos */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-md p-2 md:p-4 mb-3 md:mb-6 flex justify-center items-center gap-3 md:gap-12">
          <div className="text-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67d6fe733e18abac6832bd29/f1d45015b_logo_ministere.png"
              alt="Ministère Transition Écologique"
              className="h-[35px] md:h-[70px] object-contain mx-auto" />

          </div>

          <div className="text-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67d6fe733e18abac6832bd29/2c943b4aa_design_sans_titre_10.png"
              alt="RGE"
              className="h-[35px] md:h-[70px] object-contain mx-auto" />

          </div>

          <div className="text-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67d6fe733e18abac6832bd29/cd9653225_logo_edf.png"
              alt="EDF ENR"
              className="h-[35px] md:h-[70px] object-contain mx-auto" />

          </div>
        </div>

        {/* Main Headline with PAC Image */}
        <div className="mb-3 md:mb-6 flex items-center gap-2 md:gap-4">
          <h1
            className="text-[20px] md:text-[42px] leading-tight flex-1"
            style={{
              fontWeight: 800,
              color: '#5CB000',
              fontFamily: 'Manrope, sans-serif'
            }}>

            Passez à la pompe à chaleur pour{' '}
            <span
              className="text-[32px] md:text-[64px]"
              style={{
                fontWeight: 900,
                color: '#094386'
              }}>

              1€
            </span>
            {' '}et réduisez vos factures d'énergie
          </h1>
          <div className="flex-shrink-0">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6915b08fcd8bce51e8f22cf3/6c9519440_Designsanstitre3.png"
              alt="Pompe à chaleur"
              className="h-[70px] md:h-[180px] w-auto object-contain" />

          </div>
        </div>

        {/* Subheadline */}
        <h2
          className="text-center text-[14px] md:text-[28px] leading-snug mb-3 md:mb-8 px-2"
          style={{ fontWeight: 700 }}>

          <span style={{ color: '#094386' }}>Répondez à ces </span>
          <span style={{ color: '#5CB000' }} className="">trois questions</span>
          <span style={{ color: '#094386' }} className=""> pour confirmer votre éligibilité et obtenez votre pompe à chaleur </span>
          <span style={{ color: '#5CB000' }}>100% financée</span>
        </h2>

        {/* Eligibility Form */}
        <div id="eligibility-form" className="mb-4 md:mb-8">
          <EligibilityForm />
        </div>

        {/* Partner Logos - Only TotalEnergies and Engie */}
        <div className="flex justify-center gap-4 md:gap-8 mb-4 md:mb-8 max-w-[600px] mx-auto">
          <div className="flex items-center justify-center bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm flex-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67d6fe733e18abac6832bd29/5bb3d9233_logo_totalenergies.png"
              alt="TotalEnergies"
              className="h-[35px] md:h-[65px] w-auto object-contain" />

          </div>
          <div className="flex items-center justify-center bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm flex-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67d6fe733e18abac6832bd29/455a11f90_logo_engie.png"
              alt="Engie"
              className="h-[35px] md:h-[65px] w-auto object-contain" />

          </div>
        </div>

        {/* Main CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById('eligibility-form').scrollIntoView()}
            className="px-6 md:px-12 py-3 md:py-5 text-white text-base md:text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{
              backgroundColor: '#5CB000',
              borderRadius: '10px',
              fontFamily: 'Rubik, sans-serif'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#479E00'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#5CB000'}>

            Obtenir mes aides
          </button>
        </div>
      </div>
    </section>);

}