import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
  const setState = useState(globalState)[1];

  useEffect(() => {
    listeners.push(setState);
    // cleanup func - remove listener when component unmount
    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);
};

export default useStore;
