
import React, { useState } from 'react';
import { useMaturity, QUESTIONS } from '../context/MaturityContext';
import { ChevronRight, CheckCircle } from 'lucide-react';

const OnboardingModal = () => {
    const { saveSurvey } = useMaturity();
    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const handleSelect = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Finish
            saveSurvey(answers);
        }
    };

    const currentQuestion = QUESTIONS[currentStep];
    const isSelected = (val) => answers[currentQuestion.id] === val;
    const isStepValid = answers[currentQuestion.id] !== undefined;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-upay-orange p-6 text-white text-center">
                    <h2 className="text-2xl font-bold">Center Diagnosis</h2>
                    <p className="opacity-90 text-sm mt-1">Step {currentStep + 1} of {QUESTIONS.length}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-6 text-center text-upay-text">
                        {currentQuestion.text}
                    </h3>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.label}
                                onClick={() => handleSelect(currentQuestion.id, option.score)}
                                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${isSelected(option.score)
                                        ? 'border-upay-orange bg-orange-50'
                                        : 'border-gray-100 hover:border-orange-200'
                                    }`}
                            >
                                <span className={`font-medium ${isSelected(option.score) ? 'text-upay-orange' : 'text-gray-600'}`}>
                                    {option.label}
                                </span>
                                {isSelected(option.score) && <CheckCircle className="text-upay-orange w-5 h-5" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${isStepValid
                                ? 'bg-upay-orange text-white shadow-lg shadow-orange-200 hover:scale-105'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {currentStep === QUESTIONS.length - 1 ? 'Analyze Center' : 'Next Question'}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
