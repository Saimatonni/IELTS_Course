import React from 'react';
import { CtaText } from '@/types/course';

interface CourseBannerProps {
  title: string;
  description: string; 
  ctaText: CtaText;
  lang: string;
}

const CourseBanner: React.FC<CourseBannerProps> = ({ title, description, ctaText , lang}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>

          {description ? (
            <div
              className="text-lg md:text-xl mb-8 opacity-90"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-lg md:text-xl mb-8 opacity-90">No description available.</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default CourseBanner;