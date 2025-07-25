import React from 'react';
import { Section } from '../types/course';

interface CourseDetailsProps {
  section: Section;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ section }) => {
  if (section.type !== 'about') return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{section.name}</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {section.values?.map((detail, idx) => (
            <div key={detail.id || idx} className="bg-white rounded-lg shadow-md p-6">
              <div
                className="text-xl font-semibold mb-3"
                dangerouslySetInnerHTML={{ __html: detail.title || '' }}
              />
              {detail.description && (
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: detail.description }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
