import React from 'react';
import { Section } from '../types/course';

interface LearningOutcomesProps {
  section: Extract<Section, { type: 'pointers' }>;
}

const LearningOutcomes: React.FC<LearningOutcomesProps> = ({ section }) => {
  if (section.type !== 'pointers') return null;

  return (
    <section className="py-8">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-left mb-8 text-black">{section.name}</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            {section.values.map((outcome) => (
              <div key={outcome.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-base leading-relaxed">{outcome.text}</p>
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
