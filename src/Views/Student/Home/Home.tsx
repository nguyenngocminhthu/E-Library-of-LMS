import { useDispatch } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { AppDispatch } from "../../../redux/store";

export const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleFileUpload = async (e: any) => {
    await dispatch(uploadFilesToFirebase([e.target.files[0]], "File")).then(
      (rs: any) => {
        console.debug(rs);
      }
    );
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        placeholder="hehe"
        onChange={(e) => handleFileUpload(e)}
      />
    </div>
  );
};
