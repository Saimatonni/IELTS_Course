import React from 'react';
import { CtaText } from '@/types/course';

interface CourseHeaderProps {
  title: string;
  description: string; 
  ctaText: CtaText;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, description, ctaText }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>

          {description ? (
            <div
              className="text-lg md:text-xl mb-8 opacity-90"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-lg md:text-xl mb-8 opacity-90">No description available.</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {ctaText?.name}
            </button>
          </div>

          {/* <p className="mt-4 text-sm opacity-75">Price: ৳1000</p> */}
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
