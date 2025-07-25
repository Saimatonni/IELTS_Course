import { CourseData } from "@/types/course";
export async function fetchCourseData(lang: string = 'en'): Promise<CourseData> {
    const response = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
      {
        headers: {
          'X-TENMS-SOURCE-PLATFORM': 'web',
          'accept': 'application/json',
        },
        next: { revalidate: 3600 }, // ISR: Revalidate every hour
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch course data');
    }
  
    const json = await response.json();
    return json.data;
  }
  