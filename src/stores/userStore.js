import axios from "axios";

var listeners = [];
var state = { authenticated: false };

const emitChange = () => {
  for (var listener of listeners) {
    listener();
  }
};

export const userStore = {
  fetchUserData: async function () {
    try {
      const response = await axios.get("/api/auth");
      const data = response.data;
      this.set({
        authenticated: data.logged,
        balance: data.balance,
        email: data.email,
      });
    } catch (error) {
      console.error("Error checking authentication:", error);
      return error;
    }
  },
  get() {
    return state;
  },
  loginUser: async function (formData) {
    try {
      await axios.post("/api/auth", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error handling Login", error);
      return error;
    }
  },
  logoutUser: async function () {
    try {
      await axios.delete("/api/auth", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.set({ authenticated: false, balance: null, email: null });
    } catch (error) {
      console.error("Error handling Logout:", error);
      return error;
    }
  },
  set(newState) {
    state = {
      ...state,
      ...newState,
    };
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
