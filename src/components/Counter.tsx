import React from "react";

import { useState } from "react";

export function Counter(props: any) {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={() => increment()}>
        {props.name} + 1
      </button>
    </div>
  );
}
