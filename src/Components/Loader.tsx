import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Loader = () => {
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  return isLoading ? (
    <div className="loader">
      <Spin size="large" />
    </div>
  ) : (
    <></>
  );
};
