var listeners = [];
var state = false;

const emitChange = () => {
  for (var listener of listeners) {
    listener();
  }
};

export const drawerStore = {
  get() {
    return state;
  },
  set(value) {
    state = value;
    emitChange();
  },
  toggle() {
    drawerStore.set(!state);
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
