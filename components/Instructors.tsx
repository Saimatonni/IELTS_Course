import React from 'react';
import { Section } from '../types/course';

interface InstructorsProps {
  section: Section;
}

const Instructors: React.FC<InstructorsProps> = ({ section }) => {
  if (section.type !== 'instructors') return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{section.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.values.map((instructor) => (
            <div key={instructor.slug || instructor.name} className="bg-white rounded-lg shadow-md p-6 text-center">
              {instructor.image && (
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
              {instructor.short_description && (
                <p className="text-gray-600 mb-3">{instructor.short_description}</p>
              )}
              {instructor.description && (
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: instructor.description }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
