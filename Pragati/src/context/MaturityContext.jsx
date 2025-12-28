
import React, { createContext, useContext, useState, useEffect } from 'react';

const MaturityContext = createContext();

export const useMaturity = () => useContext(MaturityContext);

export const QUESTIONS = [
  { 
    id: 'attendance', 
    text: "How is attendance tracked?", 
    options: [
      { label: "Register/Paper", score: 0 }, 
      { label: "Excel", score: 10 }, 
      { label: "App", score: 20 }
    ] 
  },
  { 
    id: 'machines', 
    text: "Machine Availability?", 
    options: [
      { label: "High Waiting (3:1)", score: 0 }, 
      { label: "Shared (2:1)", score: 10 }, 
      { label: "1:1 Ratio", score: 20 }
    ] 
  },
  { 
    id: 'product', 
    text: "What happens to products?", 
    options: [
      { label: "Practice/Re-stitch", score: 0 }, 
      { label: "Sold Locally", score: 10 }, 
      { label: "Bulk Orders", score: 20 }
    ] 
  },
  { 
    id: 'revenue', 
    text: "Monthly Revenue?", 
    options: [
      { label: "Zero", score: 0 }, 
      { label: "< ₹10k", score: 10 }, 
      { label: "> ₹10k", score: 20 }
    ] 
  },
  { 
    id: 'customers', 
    text: "Primary Customer?", 
    options: [
      { label: "None", score: 0 }, 
      { label: "Local/Melas", score: 10 }, 
      { label: "Corporate/B2B", score: 20 }
    ] 
  },
];

export const MaturityProvider = ({ children }) => {
  const [surveyData, setSurveyData] = useState(() => {
    const saved = localStorage.getItem('upay_survey_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [phase, setPhase] = useState(1);
  const [score, setScore] = useState(0);

  const calculatePhase = (data) => {
    if (!data) return { phase: 1, score: 0 };

    let totalScore = 0;
    let gatekeeperTrip = false;

    // Calculate score and check gatekeepers
    Object.keys(data).forEach(key => {
        const question = QUESTIONS.find(q => q.id === key);
        if (question) {
            const selectedOption = question.options.find(opt => opt.score === data[key]);
            if (selectedOption) {
                totalScore += selectedOption.score;
            }
        }
    });

    // Gatekeeper Rule: If Revenue is 0 OR Product is 0 (Practice/Re-stitch) -> Phase 1
    // Note: We need to match the score values. 
    // Revenue 0 is score 0. Product 0 is score 0.
    if (data['revenue'] === 0 || data['product'] === 0) {
        gatekeeperTrip = true;
    }

    let calculatedPhase = 1;
    if (gatekeeperTrip) {
        calculatedPhase = 1;
    } else if (totalScore < 50) {
        calculatedPhase = 1;
    } else if (totalScore <= 80) {
        calculatedPhase = 2;
    } else {
        calculatedPhase = 3;
    }

    return { phase: calculatedPhase, score: totalScore };
  };

  useEffect(() => {
    if (surveyData) {
      const result = calculatePhase(surveyData);
      setPhase(result.phase);
      setScore(result.score);
      localStorage.setItem('upay_survey_data', JSON.stringify(surveyData));
    }
  }, [surveyData]);

  // Debug tool to force set state
  const debugSetSurvey = (data) => {
      setSurveyData(data);
  };

  const resetSurvey = () => {
      setSurveyData(null);
      localStorage.removeItem('upay_survey_data');
  };

  return (
    <MaturityContext.Provider value={{ 
        phase, 
        score, 
        surveyData, 
        saveSurvey: setSurveyData,
        resetSurvey,
        debugSetSurvey, 
        calculatePhase
    }}>
      {children}
    </MaturityContext.Provider>
  );
};
