import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import CourseHeader from '../components/CourseHeader';
import VideoTrailer from '../components/VideoTrailer';
import Instructors from '../components/Instructors';
import CourseFeatures from '../components/CourseFeatures';
import LearningOutcomes from '../components/LearningOutcomes';
import CourseDetails from '../components/CourseDetails';
import Checklist from '../components/Checklist';
import CourseExclusiveFeatures from '@/components/CourseExclusiveFeatures';
import { CourseData } from '../types/course';
import { fetchCourseData } from '@/lib/api';


interface HomeProps {
  courseData: CourseData;
  lang: string;
}

const Home: React.FC<HomeProps> = ({ courseData, lang }) => {
  console.log("c",courseData)
  const instructorSection = courseData.sections?.find(s => s.type === 'instructors');
  const featuresSection = courseData.sections?.find(s => s.type === 'features');
  const pointersSection = courseData.sections?.find(s => s.type === 'pointers');
  const exclusiveFeatureSection = courseData.sections?.find(s => s.type === 'feature_explanations');
  const aboutSection = courseData.sections?.find(s => s.type === 'about');

  return (
    <>
      <Head>
        <title>{courseData.seo?.title}</title>
        <meta name="description" content={courseData.seo?.description} />
        {courseData.seo?.keywords && (
          <meta name="keywords" content={courseData.seo?.keywords} />
        )}
        {courseData.seo?.og_image && (
          <>
            <meta property="og:image" content={courseData.seo?.og_image} />
            <meta property="og:title" content={courseData.seo?.title} />
            <meta property="og:description" content={courseData.seo?.description} />
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <CourseHeader
          title={courseData.title}
          description={courseData.description}
          ctaText={courseData.cta_text}
        />
        
        <VideoTrailer media={courseData.media} />
        
        {instructorSection && <Instructors section={instructorSection} />}
        
        {featuresSection && <CourseFeatures section={featuresSection} />}
        
        {pointersSection && <LearningOutcomes section={pointersSection} />}

        {exclusiveFeatureSection && (
            <CourseExclusiveFeatures section={exclusiveFeatureSection as Extract<typeof exclusiveFeatureSection, { type: 'feature_explanations' }>}/>
         )}

        
        {aboutSection && <CourseDetails section={aboutSection} />}
        
        <Checklist checklist={courseData.checklist} />
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your IELTS Journey?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of students who have achieved their dream IELTS score</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              {courseData.cta_text?.name}
            </button>
            <p className="mt-4 text-lg">Only ৳1000</p>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lang = (context.query.lang as string) || 'en';
  
  try {
    const courseData = await fetchCourseData(lang);
    
    return {
      props: {
        courseData,
        lang,
      },
    };
  } catch (error) {
    console.error('Error fetching course data:', error);
    
    return {
      notFound: true,
    };
  }
};

export default Home;
