import React from 'react';
import { Section } from '../types/course';

interface InstructorsProps {
  section: Section;
}

const Instructors: React.FC<InstructorsProps> = ({ section }) => {
  if (section.type !== 'instructors') return null;

  return (
    <section className="py-2">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-left mb-8 text-black">{section.name}</h2>

        {section.values.map((instructor) => (
          <div
            key={instructor.slug || instructor.name}
            className="bg-white rounded-lg border border-gray-200 p-6 w-full mb-6 flex flex-col md:flex-row items-start gap-6"
          >
            {instructor.image && (
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-black mb-2">{instructor.name}</h3>
              {instructor.short_description && (
                <p className="text-gray-600 mb-2">{instructor.short_description}</p>
              )}
              {instructor.description && (
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: instructor.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Instructors;
