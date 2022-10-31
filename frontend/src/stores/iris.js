import { defineStore } from "pinia";

export const useIrisStore = defineStore("iris", {
  state: () => ({
    phone: "",
    user: JSON.parse(localStorage.getItem("user")),
    loadedUser: JSON.parse(localStorage.getItem("loadedUser")),
    isLoggedIn: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    changeUsername(username) {
      this.username = username;
    },
    changeLoginState(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
    },

    setUser(user) {
      this.user = user;
    },
  },
});
