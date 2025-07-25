import React from 'react';
import { Section } from '../types/course';

interface CourseExclusiveFeaturesProps {
  section: Extract<Section, { type: 'feature_explanations' }>;
}

const CourseExclusiveFeatures: React.FC<CourseExclusiveFeaturesProps> = ({ section }) => {
  if (section.type !== 'feature_explanations') return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{section.name}</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {section.values.map((feature) => (
            <div key={feature.id} className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              {feature.file_type === 'image' && (
                <img
                  src={feature.file_url}
                  alt={feature.title}
                  className="mb-4 max-h-48 object-contain"
                />
              )}
              {feature.title && (
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              )}
              {feature.checklist && (
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  {feature.checklist.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
              {feature.video_thumbnail && feature.video_thumbnail.trim() !== '' && (
                <img
                  src={feature.video_thumbnail}
                  alt={`${feature.title} thumbnail`}
                  className="mt-4 max-h-32 object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseExclusiveFeatures;
