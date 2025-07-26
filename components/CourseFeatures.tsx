import React from 'react';
import { Section } from '../types/course';

interface CourseFeaturesProps {
  section: Extract<Section, { type: 'features' }>;
}

const CourseFeatures: React.FC<CourseFeaturesProps> = ({ section }) => {
  if (section.type !== 'features') return null;

  const getIconColor = (index: number) => {
    const colors = [
      'bg-green-500', 
      'bg-blue-500',  
      'bg-yellow-500', 
      'bg-red-500'   
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-8">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-left mb-8 text-black">{section.name}</h2>
        <div className="bg-slate-800 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {section.values.map((feature, index) => (
              <div key={feature.id} className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full ${getIconColor(index)} flex items-center justify-center flex-shrink-0`}>
                  <img src={feature.icon} alt={feature.title} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  {feature.subtitle && (
                    <p className="text-gray-300 leading-relaxed">{feature.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;