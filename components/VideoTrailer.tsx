import React from 'react';
import { Medium } from '../types/course';

interface VideoTrailerProps {
  media: Medium[];
}

const VideoTrailer: React.FC<VideoTrailerProps> = ({ media }) => {
  const trailerVideo = media.find(m => m.resource_type === 'video');

  if (!trailerVideo) return null;

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerVideo.resource_value}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Course Trailer</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={youtubeEmbedUrl}
              title="Course Trailer"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTrailer;
