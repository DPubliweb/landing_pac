import React from "react";

export default function CTAButton({ text }) {
  const scrollToForm = () => {
    document.getElementById('eligibility-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-8 md:py-12 px-4 md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex justify-center">
        <button
          onClick={scrollToForm}
          className="px-10 md:px-16 py-4 md:py-6 text-white text-lg md:text-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
          style={{
            backgroundColor: '#5CB000',
            borderRadius: '12px',
            fontFamily: 'Rubik, sans-serif'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#479E00'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#5CB000'}
        >
          {text}
        </button>
      </div>
    </div>
  );
}