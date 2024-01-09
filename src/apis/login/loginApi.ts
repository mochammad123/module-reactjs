import Swal from "sweetalert2";
import { create } from "zustand";
import Api from "../api";

// const token = localStorage.getItem("token");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

interface LoginApiResponse {
  data: any[];
  isLoading: boolean;
  error: any;
  response: any;
  login: (loginData: any) => Promise<any>;
}

const useLoginApi = create<LoginApiResponse>((set) => ({
  data: [],
  isLoading: false,
  error: null,
  response: null,

  login: async (loginData: any) => {
    set({ isLoading: true });

    try {
      const response = await Api.post("Auth/Login", loginData);
      set({ response: response?.data, isLoading: false });

      localStorage.setItem("token", response.data.data);

      Toast.fire({
        icon: "success",
        title: `Success Login`,
      });

      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoading: false });
    }
  },
}));

export default useLoginApi;
