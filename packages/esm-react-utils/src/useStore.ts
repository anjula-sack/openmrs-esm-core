import { useEffect, useMemo, useState } from "react";
import { Store, BoundAction } from "unistore";

export type Actions = Function | { [key: string]: Function };
export type BoundActions = { [key: string]: BoundAction };

export function useStore<T>(store: Store<T>): T;
export function useStore<T>(
  store: Store<T>,
  actions: Actions
): T & BoundActions;
export function useStore<T>(store: Store<T>, actions?: Actions) {
  const [state, set] = useState(store.getState());
  useEffect(() => {
    console.log("useEffect");
    store.subscribe((state) => {
      console.log("store update");
      set(state);
    });
  }, []);
  const boundActions: BoundActions = useMemo(
    () => (actions ? bindActions(store, actions) : {}),
    [store, actions]
  );

  return { ...state, ...boundActions };
}

function bindActions<T>(store: Store<T>, actions: Actions) {
  if (typeof actions == "function") {
    actions = actions(store);
  }

  const bound = {};

  for (let i in actions) {
    bound[i] = store.action(actions[i]);
  }

  return bound;
}
