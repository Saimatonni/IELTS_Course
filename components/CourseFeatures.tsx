import React from 'react';
import { Section } from '../types/course';

interface CourseFeaturesProps {
  section: Extract<Section, { type: 'features' }>;
}

const CourseFeatures: React.FC<CourseFeaturesProps> = ({ section }) => {
  if (section.type !== 'features') return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{section.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.values.map((feature) => (
            <div key={feature.id} className="bg-white rounded-lg shadow-md p-6">
              <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              {feature.subtitle && (
                <p className="text-gray-700">{feature.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;
