import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function EligibilityForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    propertyType: '',
    propertySize: '',
    heatingSystem: ''
  });
  const [hiddenFields, setHiddenFields] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    code: '',
    code_postal: '',
    utm_source: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Extract hidden fields from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    setHiddenFields({
      civilite: urlParams.get('civilite') || '',
      nom: urlParams.get('nom') || '',
      prenom: urlParams.get('prenom') || '',
      email: urlParams.get('email') || '',
      telephone: urlParams.get('telephone') || '',
      code: urlParams.get('code') || '',
      code_postal: urlParams.get('code_postal') || '',
      utm_source: urlParams.get('utm_source') || ''
    });
  }, []);

  const questions = [
    {
      id: 1,
      question: "Quel est votre statut d'habitation ?",
      options: [
        { value: 'owner_house', label: 'Propriétaire d\'une maison individuelle', emoji: '✅' },
        { value: 'tenant_house', label: 'Locataire d\'une maison individuelle', emoji: '✅' },
        { value: 'tenant_apartment', label: 'Locataire d\'un appartement', emoji: '❌' }
      ],
      key: 'propertyType'
    },
    {
      id: 2,
      question: "Votre habitation fait-elle plus ou moins de 130 mètres carrés ?",
      options: [
        { value: 'more_than_130', label: 'Plus de 130 m²', emoji: '✅' },
        { value: 'less_than_130', label: 'Moins de 130 m²', emoji: '✅' }
      ],
      key: 'propertySize'
    },
    {
      id: 3,
      question: "Quel est votre système de chauffage actuel ?",
      options: [
        { value: 'gas', label: 'Gaz', emoji: '✅' },
        { value: 'oil', label: 'Fioul', emoji: '✅' },
        { value: 'electric', label: 'Électrique', emoji: '❌' },
        { value: 'other', label: 'Autre', emoji: '❌' }
      ],
      key: 'heatingSystem'
    }
  ];

  const currentQuestion = questions[step - 1];

  // Fonction pour envoyer les données à Google Sheets
  const sendToGoogleSheets = async (leadData) => {
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbw2PaR_80zEc3xx3O1BRXD1PsGTfFvj3AO6VFde0bqm5eq7OeEx4So_OM_y9dJYZIrjlQ/exec';
    
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
        redirect: 'follow'
      });
      
      console.log('✅ Réponse Google Sheets:', response.status);
      const text = await response.text();
      console.log('✅ Contenu:', text);
      
    } catch (error) {
      console.error('❌ Erreur Google Sheets:', error);
      // On ne bloque pas le flux si Google Sheets échoue
    }
  };

  const handleAnswer = async (value) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(newAnswers);
    
    if (step < 3) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // After third question, submit the lead automatically
      setIsSubmitting(true);
      
      const leadData = {
        ...hiddenFields,
        property_type: newAnswers.propertyType,
        property_size: newAnswers.propertySize,
        heating_system: value
      };
      
      try {
                
        // Envoyer à Google Sheets (en parallèle, sans attendre)
        await sendToGoogleSheets(leadData);
        
        setTimeout(() => {
          setIsSubmitting(false);
          setIsComplete(true);
        }, 500);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        setIsSubmitting(false);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <Card className="bg-white border-2 shadow-xl max-w-3xl mx-auto" style={{ borderColor: '#5CB000', borderRadius: '15px' }}>
      <CardHeader className="text-center pb-3 md:pb-6 p-3 md:p-6" style={{ backgroundColor: '#F8F9FA', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
        <div className="flex justify-center gap-2 md:gap-3 mt-2 md:mt-4">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg transition-all duration-300"
              style={{
                backgroundColor: num <= step || isComplete ? '#5CB000' : '#E0E0E0'
              }}
            >
              {num < step || isComplete ? <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6" /> : num}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-3 md:p-8">
        {!isComplete ? (
          <>
            {isSubmitting ? (
              <div className="text-center py-8 md:py-12">
                <Loader2 className="w-12 h-12 md:w-16 md:h-16 mx-auto animate-spin mb-3 md:mb-4" style={{ color: '#5CB000' }} />
                <p className="text-base md:text-lg font-semibold" style={{ color: '#094386' }}>
                  Traitement de votre demande...
                </p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-6">
                <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-8" style={{ color: '#094386' }}>
                  {currentQuestion.question}
                </h3>
                
                <div className="grid gap-2 md:gap-4">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="p-3 md:p-5 text-left border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                      style={{
                        borderColor: answers[currentQuestion.key] === option.value ? '#5CB000' : '#E0E0E0',
                        backgroundColor: answers[currentQuestion.key] === option.value ? '#F0F9E8' : 'white',
                        borderRadius: '12px'
                      }}
                    >
                      <span className="text-sm md:text-lg font-semibold" style={{ color: '#094386' }}>
                        {option.label} {option.emoji && <span className="ml-2">{option.emoji}</span>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4 md:py-8">
            <div className="mb-3 md:mb-6">
              <CheckCircle2 className="w-12 h-12 md:w-20 md:h-20 mx-auto" style={{ color: '#5CB000' }} />
            </div>
            <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4" style={{ color: '#5CB000' }}>
              Félicitations !
            </h3>
            <p className="text-base md:text-xl" style={{ color: '#094386' }}>
              Vous êtes éligible aux aides de l'État pour votre installation.
            </p>
            <p className="text-xs md:text-sm mt-4 md:mt-6 text-gray-600">
              Un conseiller vous contactera dans les 24h
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}