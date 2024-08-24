import { toast } from "react-toastify";

export const notify = (message: string) => {
  toast.success(message, {
    autoClose: 1500,
  });
};
