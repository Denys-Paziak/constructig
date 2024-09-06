import { toast } from "react-toastify";

export const notify = (message: string) => {
  toast.success(message, {
    autoClose: 1500,
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    autoClose: 1500,
  });
};
