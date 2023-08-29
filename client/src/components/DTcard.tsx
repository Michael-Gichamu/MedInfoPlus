export const DiabetesTitleComponentCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <div className=" flex flex-col text-black rounded-xl justify-center  bg-gray-100 w-[70vw] h-[8rem]">
        <div className="title font-semibold ml-5">Title: {title}</div>
        <div className="content ml-5">{content}</div>
      </div>
    </>
  );
};
