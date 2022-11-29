import { toast } from "react-toastify";

export const completedBoard = (): void => {
  toast("Well done!", {
    theme: "dark",
    autoClose: 3000,
    pauseOnHover: false,
    type: "success",
  });
};

export const notFinished = (): void => {
  toast("Not yet", {
    theme: "dark",
    autoClose: 3000,
    pauseOnHover: false,
    type: "warning",
  });
};

export const errorToast = (): void => {
  toast("Invalid Integer", {
    theme: "dark",
    position: "top-right",
    type: "error",
    pauseOnHover: false,
    autoClose: 1000,
  });
};
