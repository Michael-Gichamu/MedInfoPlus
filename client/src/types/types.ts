export interface DcardType {
  text: string;
  width: string;
}
export interface TcardType {
  image: string;
  title: string;
  content: string;
  id: string | number;
  saved: boolean;
}

export interface Article {
  name: string;
  summary: string;
  title: string;
  id: number;
  image: string;
}

export interface LoadingProps {
  type: string | undefined;
  color: string;
}
export interface MedicalArticle {
  category: string;
  content: string;
  created_at: string;
  id: string;
  image: string;
  query_count: number;
  resource_Id: string;
  summary: string;
  title: string;
  updated_at: string;
}

export interface CategoryData {
  [key: string]: MedicalArticle[];
}
export interface articles {
  category: string;
  articles: MedicalArticle[];
}
export interface LandingHeaderProps {
  aboutSectionRef: React.RefObject<HTMLDivElement>;
  featureSectionRef: React.RefObject<HTMLDivElement>;
}

export interface PopoverProps {
  trigger: React.ReactNode;
}

export interface NewUserCredentials {
  new_name: string;
  email: string;
  password: string;
  new_password: string;
}
export interface TestimonialsProps {
  content: string;
  name: string;
  designition: string;
}
