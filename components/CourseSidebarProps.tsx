import React, { useState } from 'react';
import { Medium, Checklist as ChecklistType, CtaText } from '../types/course';

interface CourseSidebarProps {
  media: Medium[];
  checklist: ChecklistType[];
  ctaText: CtaText;
  lang: string;
  price?: {
    current: number;
    original: number;
    discount?: string;
  };
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ 
  media, 
  checklist, 
  ctaText, 
  lang,
  price = { current: 3850, original: 5000, discount: '1150 ৳ ছাড়' }
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  
  const videos = media?.filter(m => m.resource_type === 'video') || [];
  
  const currentVideo = videos[selectedVideoIndex];
  const youtubeEmbedUrl = currentVideo ? `https://www.youtube.com/embed/${currentVideo.resource_value}` : null;

  const getYoutubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // Navigation functions
  const goToPrevVideo = () => {
    if (selectedVideoIndex > 0) {
      setSelectedVideoIndex(selectedVideoIndex - 1);
    }
  };

  const goToNextVideo = () => {
    if (selectedVideoIndex < videos.length - 1) {
      setSelectedVideoIndex(selectedVideoIndex + 1);
    }
  };

  // Language-specific content
  const getContent = () => {
    if (lang === 'bn') {
      return {
        trailerTitle: 'Course Trailer | IELTS Course',
        enrollButton: 'Enroll',
        whatYouGet: 'এই কোর্সে যা থাকছে',
        currency: '৳',
        prevVideo: 'পূর্ববর্তী ভিডিও',
        nextVideo: 'পরবর্তী ভিডিও'
      };
    }
    
    return {
      trailerTitle: 'Course Trailer | IELTS Course',
      enrollButton: 'Enroll',
      whatYouGet: 'What You\'ll Get',
      currency: '৳',
      prevVideo: 'Previous Video',
      nextVideo: 'Next Video'
    };
  };

  const content = getContent();

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-8">
      {/* Main Container - Single white card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Video Section */}
        {youtubeEmbedUrl && (
          <>
            <div className="aspect-video relative p-2">
              {/* Main Video Player */}
              <iframe
                src={youtubeEmbedUrl}
                title={content.trailerTitle}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Left Navigation Arrow */}
              {videos.length > 1 && selectedVideoIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  onClick={goToPrevVideo}
                  aria-label={content.prevVideo}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
              )}
              
              {/* Right Navigation Arrow */}
              {videos.length > 1 && selectedVideoIndex < videos.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  onClick={goToNextVideo}
                  aria-label={content.nextVideo}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              )}
              
              {/* Video Counter Indicator */}
              {videos.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedVideoIndex + 1} / {videos.length}
                </div>
              )}
            </div>
            
            {/* Video thumbnails gallery */}
            {videos.length > 0 && (
              <div className="p-3 bg-gray-50 border-t">
                <div className="relative">
                  {videos.length > 5 && (
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
                      onClick={() => {
                        const container = document.getElementById('thumbnail-container');
                        if (container) {
                          container.scrollBy({ left: -200, behavior: 'smooth' });
                        }
                      }}
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                  )}
                  
                  {/* Thumbnail Container */}
                  <div 
                    id="thumbnail-container"
                    className="flex space-x-2 overflow-x-auto pb-2"
                    style={{ 
                      scrollbarWidth: 'none', 
                      msOverflowStyle: 'none'
                    }}
                  >
                    {videos.map((video, index) => (
                      <div
                        key={video.id || index}
                        className={`flex-shrink-0 w-24 h-16 relative cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                          index === selectedVideoIndex 
                            ? 'ring-2 ring-green-500 ring-offset-1' 
                            : 'hover:opacity-80 hover:scale-105'
                        }`}
                        onClick={() => setSelectedVideoIndex(index)}
                      >
                        <img
                          src={video.thumbnail_url || getYoutubeThumbnail(video.resource_value)}
                          alt={video.name || `Video ${index + 1}`}
                          className="w-full h-full object-cover bg-gray-200"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('hqdefault')) {
                              target.src = getYoutubeThumbnail(video.resource_value);
                            } else {
                              target.src = `https://img.youtube.com/vi/${video.resource_value}/maxresdefault.jpg`;
                            }
                          }}
                          onLoad={(e) => {
                            console.log(`Thumbnail loaded for video ${index}:`, (e.target as HTMLImageElement).src);
                          }}
                        />
  
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Arrow for thumbnails */}
                  {videos.length > 5 && (
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
                      onClick={() => {
                        const container = document.getElementById('thumbnail-container');
                        if (container) {
                          container.scrollBy({ left: 200, behavior: 'smooth' });
                        }
                      }}
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Pricing and CTA Section */}
        <div className="px-6 border-t">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ৳{price.current}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ৳{price.original}
              </span>
              {price.discount && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  <span className="mr-1">🔥</span>
                  {price.discount}
                </div>
              )}
            </div>
          </div>

          <button 
            className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4 transform hover:scale-105"
            type="button"
            aria-label={`${ctaText.name} - IELTS Course`}
          >
            {ctaText.name || content.enrollButton}
          </button>
        </div>

        {/* Course Features Section */}
        {checklist?.length > 0 && (
          <div className="px-6 border-t mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {content.whatYouGet}
            </h3>
            <div className="space-y-4">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                    {item.icon ? (
                      <img 
                        src={item.icon} 
                        alt="" 
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-gray-400 rounded-sm flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSidebar;