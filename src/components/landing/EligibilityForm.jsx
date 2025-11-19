import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

// ---- LOG LOCAL + QODDI ----
const logLead = (leadData) => {
  console.log("📨 LEAD ENVOYÉ :", leadData);

  fetch("/log-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData),
  }).catch(() => {});
};

// ---- ENVOI AU SERVEUR QODDI ----
const sendToServer = async (leadData) => {
  try {
    const response = await fetch(
      "https://oepnjcmswu.eu08.qoddiapp.com/leads_pac",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }
    );

    const json = await response.json();
    console.log("📬 Réponse serveur :", json);
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
  }
};

export default function EligibilityForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    propertyType: "",
    propertySize: "",
    heatingSystem: "",
  });

  const [hiddenFields, setHiddenFields] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    code: "",
    code_postal: "",
    utm_source: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // ---- Hidden Fields depuis URL ----
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setHiddenFields({
      civilite: params.get("civilite") || "",
      nom: params.get("nom") || "",
      prenom: params.get("prenom") || "",
      email: params.get("email") || "",
      telephone: params.get("telephone") || "",
      code: params.get("code") || "",
      code_postal: params.get("code_postal") || "",
      utm_source: params.get("utm_source") || "",
    });
  }, []);

  // ---- Questions ----
  const questions = [
    {
      id: 1,
      question: "Quel est votre statut d'habitation ?",
      options: [
        { value: "owner_house", label: "Propriétaire d'une maison individuelle", emoji: "✅" },
        { value: "tenant_house", label: "Locataire d'une maison individuelle", emoji: "✅" },
        { value: "tenant_apartment", label: "Locataire d'un appartement", emoji: "❌" },
      ],
      key: "propertyType",
    },
    {
      id: 2,
      question: "Votre habitation fait-elle plus ou moins de 130 m² ?",
      options: [
        { value: "more_than_130", label: "Plus de 130 m²", emoji: "✅" },
        { value: "less_than_130", label: "Moins de 130 m²", emoji: "✅" },
      ],
      key: "propertySize",
    },
    {
      id: 3,
      question: "Quel est votre système de chauffage actuel ?",
      options: [
        { value: "gas", label: "Gaz", emoji: "✅" },
        { value: "oil", label: "Fioul", emoji: "✅" },
        { value: "electric", label: "Électrique", emoji: "❌" },
        { value: "other", label: "Autre", emoji: "❌" },
      ],
      key: "heatingSystem",
    },
  ];

  const currentQuestion = questions[step - 1];

  // ---- Submit ----
  const handleAnswer = async (value) => {
    const updated = { ...answers, [currentQuestion.key]: value };
    setAnswers(updated);

    if (step < 3) {
      setTimeout(() => setStep(step + 1), 250);
      return;
    }

    // Dernière question → envoi
    setIsSubmitting(true);

    const leadData = {
      ...hiddenFields,
      property_type: updated.propertyType,
      property_size: updated.propertySize,
      heating_system: value,
      timestamp: new Date().toISOString(),
      page: window.location.href,
    };

    // Log
    logLead(leadData);

    // Envoi backend
    sendToServer(leadData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 600);
  };

  return (
    <Card
      className="bg-white border-2 shadow-xl max-w-3xl mx-auto"
      style={{ borderColor: "#5CB000", borderRadius: 15 }}
    >
      <CardHeader
        className="text-center p-4 md:p-6"
        style={{ backgroundColor: "#F8F9FA", borderRadius: "13px 13px 0 0" }}
      >
        <div className="flex justify-center gap-3 mt-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: n <= step || isComplete ? "#5CB000" : "#E0E0E0" }}
            >
              {n < step || isComplete ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                n
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-8">
        {!isComplete ? (
          isSubmitting ? (
            <div className="text-center py-10">
              <Loader2 className="w-14 h-14 mx-auto animate-spin" style={{ color: "#5CB000" }} />
              <p className="text-lg font-semibold mt-4" style={{ color: "#094386" }}>
                Traitement de votre demande...
              </p>
            </div>
          ) : (
            <>
              <h3
                className="text-xl font-bold text-center mb-6"
                style={{ color: "#094386" }}
              >
                {currentQuestion.question}
              </h3>

              <div className="grid gap-4">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="p-4 border-2 rounded-lg text-left hover:shadow-lg transition"
                    style={{
                      borderColor:
                        answers[currentQuestion.key] === opt.value
                          ? "#5CB000"
                          : "#E0E0E0",
                      backgroundColor:
                        answers[currentQuestion.key] === opt.value
                          ? "#F0F9E8"
                          : "white",
                    }}
                  >
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#094386" }}
                    >
                      {opt.label} {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )
        ) : (
          <div className="text-center py-10">
            <CheckCircle2
              className="w-20 h-20 mx-auto mb-4"
              style={{ color: "#5CB000" }}
            />
            <h3 className="text-3xl font-bold mb-3" style={{ color: "#5CB000" }}>
              Félicitations !
            </h3>
            <p className="text-xl" style={{ color: "#094386" }}>
              Vous êtes éligible aux aides de l'État.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Un conseiller vous rappellera dans les prochaines 24h.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
