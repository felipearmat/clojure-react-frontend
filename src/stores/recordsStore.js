import axios from "axios";

var listeners = [];
var state = [];

const emitChange = () => {
  for (var listener of listeners) {
    listener();
  }
};

export const recordsStore = {
  deleteRecords: async function (records) {
    try {
      const response = await axios.delete("/api/v1/records/", {
        data: { records: records.map((record) => record.id) },
      });
      const data = response?.data;
      return {
        type: "success",
        message: data?.message,
        balance: data?.balance,
      };
    } catch (error) {
      return { type: "error", message: `Error deleting records: ${error}` };
    }
  },
  fetchRecords: async function (params) {
    try {
      const response = await axios.get("/api/v1/records", { params });
      const data = response?.data?.records;
      if (Array.isArray(data)) {
        return {
          type: "success",
          data: data,
        };
      }
    } catch (error) {
      return { type: "error", message: `Error fetching records: ${error}` };
    }
  },
  get() {
    return state;
  },
  set(newState) {
    state = newState;
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
