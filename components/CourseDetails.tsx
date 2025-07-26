import React, { useState } from 'react';
import { Section } from '../types/course';

interface CourseDetailsProps {
  section: Section;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ section }) => {
  if (section.type !== 'about') return null;

  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-8 bg-white">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-left mb-8 text-black">{section.name}</h2>
        <div className="bg-white border border-gray-200 rounded-lg">
          {section.values?.map((detail, idx) => (
            <div key={detail.id || idx}>
              <div
                className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(detail.id || idx.toString())}
              >
                <div className="flex-1">
                  <div
                    className="text-xl font-semibold text-black"
                    dangerouslySetInnerHTML={{ __html: detail.title || '' }}
                  />
                </div>
                <div className="ml-4 flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      expandedItems[detail.id || idx.toString()] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {expandedItems[detail.id || idx.toString()] && detail.description && (
                <div className="px-6 pb-6">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: detail.description }}
                  />
                </div>
              )}

              {/* Divider line between items (except last) */}
              {idx < (section.values?.length || 0) - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
