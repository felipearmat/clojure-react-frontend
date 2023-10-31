import axios from "axios";

var listeners = [];
var state = [];

const emitChange = () => {
  for (var listener of listeners) {
    listener();
  }
};

export const calculatorStore = {
  calculate: async function (expression) {
    try {
      const response = await axios.post("/api/v1/calculate", { expression });
      const data = response.data;
      this.set(`${expression} = ${data.result}`);
      return {
        type: "success",
        ...data,
      };
    } catch (error) {
      return {
        type: "error",
        message: error?.response?.data || error.message,
      };
    }
  },
  get() {
    return state;
  },
  set(newEntry) {
    state = [...state, newEntry].slice(-9);
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
