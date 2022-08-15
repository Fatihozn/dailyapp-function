import { React, useState } from "react";
import App from "./App";
import { mainContext } from "./components/Context";

export default function Context() {
  const [count, setCount] = useState(3);
  const [IconCount, setIconCount] = useState(0);

  const data = {
    count,
    setCount,
    IconCount,
    setIconCount,
  };

  return (
    <mainContext.Provider value={data}>
      <App />
    </mainContext.Provider>
  );
}
