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

interface IApproval {
  data: any;
  isLoadingApproval: boolean;
  error: any;
  response: any;
  approvalBudgetPlan: (id: number) => Promise<any>;
  approvalEnforcement: (id: number) => Promise<any>;
  rejectBudgetPlan: (data: any) => Promise<any>;
  rejectEnforcement: (data: any) => Promise<any>;
}

const useApprovalApi = create<IApproval>((set) => ({
  data: [],
  isLoadingApproval: false,
  error: null,
  response: null,

  approvalBudgetPlan: async (id) => {
    set({ isLoadingApproval: true });
    try {
      const response = await Api.post(
        "Approval/BudgetDepartment",
        {
          budgetPlanId: id,
        },
        {
          params: {
            budgetPlanId: id,
          },
        }
      );
      set({ response: response?.data, isLoadingApproval: false });
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
        localStorage.removeItem("authenticationToken");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoadingApproval: false });
    }
  },

  rejectBudgetPlan: async (data) => {
    set({ isLoadingApproval: true });
    try {
      const response = await Api.post("Approval/BudgetDepartmentReject", data, {
        params: data,
      });
      set({ response: response?.data, isLoadingApproval: false });
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
        localStorage.removeItem("authenticationToken");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoadingApproval: false });
    }
  },

  approvalEnforcement: async (id) => {
    set({ isLoadingApproval: true });
    try {
      const response = await Api.post(
        "Approval/EnforcementDepartment",
        {
          enforcementId: id,
        },
        {
          params: {
            enforcementId: id,
          },
        }
      );
      set({ response: response?.data, isLoadingApproval: false });
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
        localStorage.removeItem("authenticationToken");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoadingApproval: false });
    }
  },

  rejectEnforcement: async (data) => {
    set({ isLoadingApproval: true });
    try {
      const response = await Api.post("Approval/EnforcementReject", data, {
        params: data,
      });
      set({ response: response?.data, isLoadingApproval: false });
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
        localStorage.removeItem("authenticationToken");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoadingApproval: false });
    }
  },
}));

export default useApprovalApi;
