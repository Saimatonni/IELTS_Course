import React from 'react';
import { Section } from '../types/course';

interface CourseExclusiveFeaturesProps {
  section: Extract<Section, { type: 'feature_explanations' }>;
}

const CourseExclusiveFeatures: React.FC<CourseExclusiveFeaturesProps> = ({ section }) => {
  if (section.type !== 'feature_explanations') return null;

  return (
    <section className="py-8 bg-white">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-left mb-8 text-black">{section.name}</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {section.values.map((feature, index) => (
            <div key={feature.id}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 py-6">
                {/* Left side - Content */}
                <div className="flex-1">
                  {feature.title && (
                    <h6 className="text-xl font-semibold mb-6 text-black">{feature.title}</h6>
                  )}
                  {feature.checklist && (
                    <div className="space-y-4">
                      {feature.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-1">
                            <svg
                              className="w-4 h-4 text-blue-500"
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
                          <p className="text-gray-700 text-base leading-relaxed flex-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Right side - Image/Thumbnail */}
                <div className="flex-shrink-0">
                  {feature.file_type === 'image' && feature.file_url && (
                    <div className="w-80 h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img
                        src={feature.file_url}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {feature.video_thumbnail && feature.video_thumbnail.trim() !== '' && (
                    <div className="w-80 h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img
                        src={feature.video_thumbnail}
                        alt={`${feature.title} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* Fallback promotional box if no image */}
                  {!feature.file_url && !feature.video_thumbnail && (
                    <div className="w-80 h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden">
                      <div className="text-center z-10">
                        <div className="text-4xl font-bold mb-2">50+</div>
                        <div className="text-lg font-semibold">VIDEO LECTURES</div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute inset-0 bg-red-700/20"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Divider line between features (except last) */}
              {index < section.values.length - 1 && (
                <div className="border-b border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseExclusiveFeatures;