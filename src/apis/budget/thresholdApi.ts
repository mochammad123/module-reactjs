import { create } from "zustand";
import Swal from "sweetalert2";
import Api from "../api";

// const token = localStorage.getItem("token");
// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   },
// });

interface ThresholdResponse {
  dataThreshold: any;
  isLoadingGetThreshold: boolean;
  error: any;
  response: any;
  getThreshold: (deptId: number) => Promise<any>;
  thresholdFunction: any;
  setThresholdFunction: any;
}

const useThresholdApi = create<ThresholdResponse>((set) => ({
  dataThreshold: [],
  isLoadingGetThreshold: false,
  error: null,
  response: null,
  thresholdFunction: null,
  setThresholdFunction: (item: any) => set({ thresholdFunction: item }),

  getThreshold: async (deptId) => {
    set({ isLoadingGetThreshold: true });

    try {
      const response = await Api.get("Approval/Threshold", {
        params: {
          deptId: deptId,
        },
      });
      set({
        dataThreshold: response.data,
        isLoadingGetThreshold: false,
      });
      return response.data;
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
      }
      set({ error: error, isLoadingGetThreshold: false });
    }
  },
}));

export default useThresholdApi;
