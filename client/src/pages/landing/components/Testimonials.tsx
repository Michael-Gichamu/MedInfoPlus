import { TestimonialsProps } from "../../../types/types";
export const Testimonials = ({
  content,
  name,
  designition,
}: TestimonialsProps): JSX.Element => {
  return (
    <div>
      <div className="  border-none bg-gray-900 text-white rounded-md w-[22rem]  p-5 min-h-[15rem]">
        <p className=" text-xl">{name}</p>
        <p className="  text-gray-400">{designition}</p>
        <div className="flex flex-wrap  h-max">{content}</div>
      </div>
    </div>
  );
};
