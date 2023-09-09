import ReactLoading from "react-loading";
import { LoadingProps } from "../types/types";

export const LoadingComponent = ({ color }: LoadingProps): JSX.Element => {
  return (
    <>
      <ReactLoading color={color} height={667} width={375} />
    </>
  );
};
