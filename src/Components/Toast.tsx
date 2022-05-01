import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (content: string) => {
  return (
    <>
      {(() => {
        toast.info(content, { theme: "dark" });
      })()}
    </>
  );
};

export default Toast;
