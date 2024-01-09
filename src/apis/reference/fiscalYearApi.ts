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

interface FiscalYearApiResponse {
  dataExchangeRateFiscal: any;
  isLoadingExchangeRateFiscal: boolean;
  error: any;
  response: any;
  getExchangeRateFiscalYear: (fiscalYearId: number) => Promise<number>;
}

const useFiscalYearApi = create<FiscalYearApiResponse>((set) => ({
  dataExchangeRateFiscal: [],
  isLoadingExchangeRateFiscal: false,
  error: null,
  response: null,

  getExchangeRateFiscalYear: async (fiscalYearId: number) => {
    set({ isLoadingExchangeRateFiscal: true });

    try {
      const response = await Api.get(
        `Master/ExchangeRates/FiscalYear/${fiscalYearId}`
      );
      set({
        dataExchangeRateFiscal: response.data,
        isLoadingExchangeRateFiscal: false,
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
      }
      set({ error: error, isLoadingExchangeRateFiscal: false });
    }
  },
}));

export default useFiscalYearApi;
