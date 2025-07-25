import React from 'react';
import { Section } from '../types/course';

interface LearningOutcomesProps {
  section: Extract<Section, { type: 'pointers' }>;
}

const LearningOutcomes: React.FC<LearningOutcomesProps> = ({ section }) => {
  if (section.type !== 'pointers') return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{section.name}</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {section.values.map((outcome) => (
              <div key={outcome.id} className="flex items-start space-x-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                    outcome.color === 'black' ? 'bg-black' : 'bg-green-500'
                  }`}
                >
                  {outcome.icon === '0' ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <span className="text-white">{outcome.icon}</span>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 text-sm mt-1">{outcome.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
