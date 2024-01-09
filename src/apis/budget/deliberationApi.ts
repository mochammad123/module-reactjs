import { create } from "zustand";
import Swal from "sweetalert2";
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

interface IDeliberation {
  dataPraDeliberation: any;
  dataDeliberation: any;
  isLoadingPraDeliberation: boolean;
  isLoadingDeliberation: boolean;
  isLoading: boolean;
  error: any;
  response: any;
  getPraDeliberation: () => Promise<any>;
  getDeliberationPagination: (getDeliberationPagination: any) => Promise<any>;
  createDeliberation: (data: any) => Promise<any>;
  dataDeliberationPagination: any;
  setDataDeliberationPagination: any;
  show?: any;
  setShow?: any;
  dataDoubleClick?: any;
  setDataDoubleClick?: any;
}

const useDeliberationApi = create<IDeliberation>((set) => ({
  dataPraDeliberation: [],
  dataDeliberation: [],
  isLoadingPraDeliberation: false,
  isLoadingDeliberation: false,
  isLoading: false,
  error: null,
  response: null,
  dataDeliberationPagination: null,
  setDataDeliberationPagination: (item: any) =>
    set({ dataDeliberationPagination: item }),
  show: null,
  setShow: (item: boolean) => set({ show: item }),
  dataDoubleClick: null,
  setDataDoubleClick: (item: any) => set({ dataDoubleClick: item }),

  getPraDeliberation: async () => {
    set({ isLoadingPraDeliberation: true });

    try {
      const response = await Api.get("Budget/PraDeliberation");
      set({
        dataPraDeliberation: response.data,
        isLoadingPraDeliberation: false,
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
      set({ error: error, isLoadingPraDeliberation: false });
    }
  },

  getDeliberationPagination: async (getDeliberationPagination: any) => {
    set({ isLoadingDeliberation: true });

    try {
      const response = await Api.post(
        "Budget/Plan/Deliberation/Paginate",
        getDeliberationPagination
      );
      set({ dataDeliberation: response?.data, isLoadingDeliberation: false });
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
      set({ error: error, isLoadingDeliberation: false });
    }
  },

  createDeliberation: async (data) => {
    set({ isLoading: true });
    try {
      const response = await Api.post("Approval/BudgetFinal", data);
      set({ response: response?.data, isLoading: false });
      Toast.fire({
        icon: "success",
        title: `${response?.data?.message}`,
      });
      return response?.data;
    } catch (error: any) {
      console.log(error);
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

export default useDeliberationApi;
