import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  // actionIdentifier key{}
  const dispatch = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    globalState = { ...globalState, ...newState };
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);
    // cleanup func - remove listener when component unmount
    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userAction, intialState) => {
  if (intialState) {
    // merge to handle multiple stores
    globalState = { ...globalState, intialState };
  }
  actions = { ...actions, ...userAction };
};
