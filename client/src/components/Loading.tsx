import ReactLoading from "react-loading";
import { LoadingProps } from "../types/types";

export const LoadingComponent = ({ color }: LoadingProps): JSX.Element => {
  return (
    <>
      <ReactLoading color={color} height={667} width={375} />
    </>
  );
};

export const BookletLoading = ({ pages = 3 }) => {
  const pageElements = [];
  for (let i = 0; i < pages; i++) {
    pageElements.push(
      <div key={i} className="booklet-page">
        {/* Loading animation */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="booklet-loading flex flex-wrap gap-4 p-4 bg-gray-200 rounded-lg shadow-md border border-gray-300">
      {pageElements}
    </div>
  );
};

export const PulsatingLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
    </div>
  );
};
