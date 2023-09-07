export interface DcardType {
  text: string;
  width: string;
}
export interface TcardType {
  image: string;
  title: string;
  content: string;
  id: string | number;
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
