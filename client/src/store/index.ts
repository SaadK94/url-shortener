import { createStore } from "vuex";
import axios from "axios";

interface UrlDto {
  id: string;
  fullUrl: string;
  shortId: string;
  shortUrl: string;
  createdAt: string;
}

export default createStore({
  state: {
    urlList: [] as UrlDto[],
    showSnackbar: false,
    snackbarMessage: "",
  },
  mutations: {
    set_urlList(state, payload: UrlDto[]) {
      state.urlList = payload;
    },
    set_showSnackbar(state, payload: boolean) {
      state.showSnackbar = payload;
    },
    set_snackbarMessage(state, payload: string) {
      state.snackbarMessage = payload;
    },
  },
  actions: {
    async getUrls({ commit, dispatch }): Promise<void> {
      try {
        const res = await axios.get("http://localhost:3000/api/url");
        commit("set_urlList", res.data);
      } catch (e) {
        console.log(e);
        await dispatch(
          "showSnackbar",
          "Network error: Could not retrieve URLs"
        );
      }
    },
    async submitUrl({ dispatch }, url: string): Promise<void> {
      try {
        await axios.post("http://localhost:3000/api/url", { url });
        await dispatch("getUrls");
      } catch (e) {
        console.log(e);
        dispatch("showSnackbar", "Network error: Could not post URL");
      }
    },
    async deleteUrl({ dispatch }, id: string): Promise<void> {
      try {
        await axios.delete(`http://localhost:3000/api/url/${id}`);
        await dispatch("getUrls");
      } catch (e) {
        console.log(e);
        await dispatch("showSnackbar", "Network error: Could delete URL");
      }
    },
    showSnackbar({ commit, state }, message: string) {
      if (!state.showSnackbar) {
        commit("set_snackbarMessage", message);
        commit("set_showSnackbar", true);
        setTimeout(() => {
          commit("set_showSnackbar", false);
          commit("set_snackbarMessage", "");
        }, 3000);
      }
    },
  },
  modules: {},
});
