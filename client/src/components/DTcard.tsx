import { useNavigate } from "react-router-dom";
export const DiabetesTitleComponentCard = ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: string;
}) => {
  const navigate = useNavigate();
  const handlenav = () => {
    navigate(`/article/${id}`);
  };
  return (
    <>
      <div
        onClick={handlenav}
        className=" cursor-pointer flex flex-col text-black rounded-xl justify-center  bg-gray-100 w-[70vw] h-[8rem]"
      >
        <div className="title font-semibold ml-5"> {title}</div>
        <div className="content ml-5">{content}</div>
      </div>
    </>
  );
};
