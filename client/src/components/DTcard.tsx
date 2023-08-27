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
        <div className="content ml-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
          repudiandae quo officiis quos eaque? Aliquid expedita perspiciatis
          recusandae, consectetur laboriosam iste ut eligendi necessitatibus
          quidem veritatis ullam illum sint voluptate.
          {content}
        </div>
      </div>
    </>
  );
};
