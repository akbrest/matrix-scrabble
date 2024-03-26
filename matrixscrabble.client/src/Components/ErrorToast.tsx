import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/slices/errorSlice";
import { AppDispatch } from "../redux/store";
import { selectErrorMessage } from "../redux/slices/errorSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorToast: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch]);

  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default ErrorToast;
