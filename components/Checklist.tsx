import React from 'react';
import { Checklist as ChecklistType } from '../types/course';

interface ChecklistProps {
  checklist: ChecklistType[];
}

const Checklist: React.FC<ChecklistProps> = ({ checklist }) => {
  if (!checklist?.length) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What You&apos;ll Get</h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checklist;