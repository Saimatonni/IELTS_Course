export interface Medium {
  id?: number;
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

  
  export interface Checklist {
    id: number;
    text: string;
    icon?: string;
  }
  
  export interface Seo {
    title: string;
    description: string;
    keywords?: string;
    og_image?: string;
  }
  
  export interface CtaText {
    name: string;  
    value: string; 
  }
  
  export type SectionType =
  | 'bundle_items'
  | 'offers'
  | 'instructors'
  | 'features'
  | 'group_join_engagement'
  | 'pointers'
  | 'content_preview'
  | 'about'
  | 'feature_explanations'
  | 'free_items'
  | 'certificate'
  | 'bundle_certificate'
  | 'testimonials'
  | 'requirements'
  | 'how_to_pay'
  | 'faq';

export interface SectionItemValueBase {
  name: string;
  description?: string;
  image?: string;
  short_description?: string;
  has_instructor_page?: boolean;
  slug?: string;
}

export interface FeatureValue {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
}

export interface PointerValue {
  id: string;
  color?: string;
  icon?: string;
  text: string;
}

export interface AboutValue {
  id: string;
  title: string;        
  description: string;  
  icon?: string;
}

export interface FeatureExplanationValue {
  id: string;
  checklist: string[];
  file_type: string;
  file_url: string;
  title: string;
  video_thumbnail?: string;
}

export type Section =
  | {
      id?: number;
      type: 'features';
      name: string;
      description: string;
      bg_color?: string;
      order_idx?: number;
      values: FeatureValue[];
    }
  | {
      id?: number;
      type: 'pointers';
      name: string;
      description: string;
      bg_color?: string;
      order_idx?: number;
      values: PointerValue[];
    }
  | {
      id?: number;
      type: 'about';
      name: string;
      description: string;
      bg_color?: string;
      order_idx?: number;
      values: AboutValue[];
    }
  | {
      id?: number;
      type: 'feature_explanations';
      name: string;
      description: string;
      bg_color?: string;
      order_idx?: number;
      values: FeatureExplanationValue[];
    }
  | {
      id?: number;
      type: Exclude<
        SectionType,
        'features' | 'pointers' | 'about' | 'feature_explanations'
      >;
      name: string;
      description: string;
      bg_color?: string;
      order_idx?: number;
      values: SectionItemValueBase[];
    };


export interface CourseData {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: Medium[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
}
