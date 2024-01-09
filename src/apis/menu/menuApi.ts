import { create } from "zustand";
import Swal from "sweetalert2";
import Api from "../api";

interface MenuApiResponse {
  menus: any;
  isLoading: boolean;
  error: any;
  response: any;
  getMenus: any;
  stateMenuData: any;
  setStateMenuData: any;
}

const useMenuApi = create<MenuApiResponse>((set) => ({
  menus: [],
  isLoading: false,
  error: null,
  response: null,
  stateMenuData: null,
  setStateMenuData: (item: any) => set({ stateMenuData: item }),

  getMenus: async () => {
    set({ isLoading: true });

    try {
      const response = await Api.get("Auth/MyMenu");
      set({ menus: response.data, isLoading: false });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      }
      set({ error: error, isLoading: false });
    }
  },
}));

export default useMenuApi;
