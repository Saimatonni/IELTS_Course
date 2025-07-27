import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import CourseSidebar from '@/components/CourseSidebarProps';
import Instructors from '../components/Instructors';
import CourseFeatures from '../components/CourseFeatures';
import LearningOutcomes from '../components/LearningOutcomes';
import CourseDetails from '../components/CourseDetails';
import CourseExclusiveFeatures from '../components/CourseExclusiveFeatures';
import { CourseData } from '../types/course';
import { fetchCourseData } from '../lib/api';

interface HomeProps {
  courseData: CourseData;
  lang: string;
}

const Home: React.FC<HomeProps> = ({ courseData, lang }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(0);
  const [showFloatingSidebar, setShowFloatingSidebar] = useState(false);
  
  useEffect(() => {
    const urlLang = router.query.lang as string;
    if (urlLang && urlLang !== lang && ['en', 'bn'].includes(urlLang)) {
      router.replace(router.asPath);
    }
  }, [router.query.lang, lang, router]);


  useEffect(() => {
    const handleScroll = () => {
      const bannerElement = document.querySelector('.course-banner');
      if (bannerElement) {
        const bannerBottom = bannerElement.getBoundingClientRect().bottom;
        setShowFloatingSidebar(bannerBottom < 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const instructorSection = courseData.sections?.find(s => s.type === 'instructors');
  const featuresSection = courseData.sections?.find(s => s.type === 'features');
  const pointersSection = courseData.sections?.find(s => s.type === 'pointers');
  const exclusiveFeatureSection = courseData.sections?.find(s => s.type === 'feature_explanations');
  const aboutSection = courseData.sections?.find(s => s.type === 'about');

  const navigationSections = [
    {
      id: 'instructor',
      title: lang === 'bn' ? 'কোর্স ইন্সট্রাক্টর' : 'Course instructor',
      component: instructorSection ? <Instructors section={instructorSection} /> : null
    },
    {
      id: 'layout',
      title: lang === 'bn' ? 'কোর্সটি কীভাবে সাজানো হয়েছে' : 'How the course is laid out',
      component: featuresSection ? <CourseFeatures section={featuresSection} /> : null
    },
    {
      id: 'learning',
      title: lang === 'bn' ? 'কোর্সটি করে আপনি যা শিখবেন' : 'What you will learn by doing the course',
      component: pointersSection ? <LearningOutcomes section={pointersSection} /> : null
    },
    {
      id: 'exclusive',
      title: lang === 'bn' ? 'কোর্স এক্সক্লুসিভ ফিচার' : 'Course Exclusive Feature',
      component: exclusiveFeatureSection ? <CourseExclusiveFeatures section={exclusiveFeatureSection} /> : null
    },
    {
      id: 'details',
      title: lang === 'bn' ? 'কোর্সের বিস্তারিত' : 'Course details',
      component: aboutSection ? <CourseDetails section={aboutSection} /> : null
    }
  ];

  const getCtaContent = () => {
    if (lang === 'bn') {
      return {
        heading: 'আপনার IELTS যাত্রা শুরু করতে প্রস্তুত?',
        description: 'হাজারো শিক্ষার্থীর সাথে যোগ দিন যারা তাদের স্বপ্নের IELTS স্কোর অর্জন করেছে',
        buttonText: courseData.cta_text?.name || 'এনরোল করুন',
        priceText: 'মাত্র ৳৩৮৫০'
      };
    }
    
    return {
      heading: 'Ready to Start Your IELTS Journey?',
      description: 'Join thousands of students who have achieved their dream IELTS score',
      buttonText: courseData.cta_text?.name || 'Enroll Now',
      priceText: 'Only ৳3850'
    };
  };

  const ctaContent = getCtaContent();

  const handlePrevious = () => {
    setActiveSection((prev) => prev > 0 ? prev - 1 : navigationSections.length - 1);
  };

  const handleNext = () => {
    setActiveSection((prev) => prev < navigationSections.length - 1 ? prev + 1 : 0);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sidebarProps = {
    media: courseData.media || [],
    checklist: courseData.checklist || [],
    ctaText: courseData.cta_text || { name: 'Enroll Now', value: 'enroll' },
    lang,
    price: {
      current: 3850,
      original: 5000,
      discount: '1150 ৳ ছাড়'
    }
  };

  return (
    <>
      <Head>
        <title>{courseData.seo?.title || `IELTS Course - 10 Minute School`}</title>
        <meta name="description" content={courseData.seo?.description || 'Master IELTS with our comprehensive course'} />
        {courseData.seo?.keywords && (
          <meta name="keywords" content={courseData.seo.keywords} />
        )}
        {courseData.seo?.og_image && (
          <>
            <meta property="og:image" content={courseData.seo.og_image} />
            <meta property="og:title" content={courseData.seo.title} />
            <meta property="og:description" content={courseData.seo.description} />
          </>
        )}

        <link rel="alternate" hrefLang="en" href={`${typeof window !== 'undefined' ? window.location.pathname : ''}?lang=en`} />
        <link rel="alternate" hrefLang="bn" href={`${typeof window !== 'undefined' ? window.location.pathname : ''}?lang=bn`} />
        <link rel="alternate" hrefLang="x-default" href={typeof window !== 'undefined' ? window.location.pathname : ''} />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="10 Minute School" />
        <meta name="language" content={lang} />
        <link rel="icon" href="/favicon.ico" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="10 Minute School" />
        <meta property="og:locale" content={lang === 'bn' ? 'bn_BD' : 'en_US'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@10minuteschool" />
        <meta name="twitter:title" content={courseData.seo?.title || 'IELTS Course - 10 Minute School'} />
        <meta name="twitter:description" content={courseData.seo?.description || 'Master IELTS with our comprehensive course'} />
        {courseData.seo?.og_image && (
          <meta name="twitter:image" content={courseData.seo.og_image} />
        )}
      </Head>

      <Header />

      <main className="min-h-screen bg-white">
        {/* Course Banner */}
        <div className="course-banner bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left side - Course info with proper spacing */}
              <div className="flex-1 lg:w-2/3 lg:pr-8 text-left lg:max-w-[calc(100%-25rem)]">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">{courseData.title}</h1>
                {courseData.description ? (
                  <div
                    className="text-lg md:text-xl mb-8 opacity-90"
                    dangerouslySetInnerHTML={{ __html: courseData.description }}
                  />
                ) : (
                  <p className="text-lg md:text-xl mb-8 opacity-90">No description available.</p>
                )}
              </div>

              <div className={`lg:absolute lg:right-20 lg:top-8 lg:w-96 w-full lg:z-10 transition-opacity duration-300 ${
                showFloatingSidebar ? 'lg:opacity-0 lg:pointer-events-none' : 'lg:opacity-100'
              }`}>
                <CourseSidebar {...sidebarProps} />
              </div>

            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 py-8 bg-white">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Main Content */}
            <div className="flex-1 lg:w-2/3 lg:pr-8 bg-white">
              
              {/* Navigation Section - Inside main content */}
              <div className="bg-gray-50 border-b border-gray-200 mb-8 -mx-4 px-4 sticky top-0 z-40">
                <div className="flex items-center justify-between">
                  {/* Left Arrow */}
                  <button
                    onClick={handlePrevious}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 flex-shrink-0"
                    aria-label="Previous section"
                  >
                    <svg 
                      className="w-5 h-5 text-gray-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 19l-7-7 7-7" 
                      />
                    </svg>
                  </button>

                  {/* Navigation Tabs */}
                  <div className="flex items-center overflow-x-auto scrollbar-hide mx-4 flex-1">
                    <div className="flex space-x-1">
                      {navigationSections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => {
                            setActiveSection(index);
                            scrollToSection(section.id);
                          }}
                          className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                            activeSection === index
                              ? 'border-green-500 text-green-600 bg-white'
                              : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                          }`}
                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={handleNext}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 flex-shrink-0"
                    aria-label="Next section"
                  >
                    <svg 
                      className="w-5 h-5 text-gray-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
              
              {instructorSection && (
                <div id="instructor" className="scroll-mt-20">
                  <Instructors section={instructorSection} />
                </div>
              )}
              
              {featuresSection && (
                <div id="layout" className="scroll-mt-20">
                  <CourseFeatures section={featuresSection} />
                </div>
              )}
              
              {pointersSection && (
                <div id="learning" className="scroll-mt-20">
                  <LearningOutcomes section={pointersSection} />
                </div>
              )}

              {exclusiveFeatureSection && (
                <div id="exclusive" className="scroll-mt-20">
                  <CourseExclusiveFeatures 
                    section={exclusiveFeatureSection as Extract<typeof exclusiveFeatureSection, { type: 'feature_explanations' }>}
                  />
                </div>
              )}
              
              {aboutSection && (
                <div id="details" className="scroll-mt-20">
                  <CourseDetails section={aboutSection} />
                </div>
              )}
            </div>

            {/* Right Column  */}
            <div className="hidden lg:block lg:w-96 bg-white relative">
              <div className={`transition-all duration-300 ${
                showFloatingSidebar 
                  ? 'opacity-100 translate-y-0 sticky top-8' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}>
                <CourseSidebar {...sidebarProps} />
              </div>
            </div>

          </div>
        </div>
        
        {/* Final CTA Section */}
        <section className="py-16 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {ctaContent.heading}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {ctaContent.description}
            </p>
            <button 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              type="button"
              aria-label={`${ctaContent.buttonText} - IELTS Course`}
            >
              {ctaContent.buttonText}
            </button>
            <p className="mt-4 text-lg">
              {ctaContent.priceText}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const lang = (context.query.lang as string) || 'en';
  const validLangs = ['en', 'bn'];
  const finalLang = validLangs.includes(lang) ? lang : 'en';
  
  try {
    const courseData = await fetchCourseData(finalLang);
    if (!courseData || !courseData.title) {
      console.error('Invalid course data received');
      return { notFound: true };
    }
    
    return {
      props: {
        courseData,
        lang: finalLang,
      },
    };
  } catch (error) {
    console.error('Error fetching course data:', error);
    return { notFound: true };
  }
};

export default Home;