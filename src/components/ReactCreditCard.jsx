import React, { useState } from "react";
import Cards from "react-credit-cards-2";
// import "react-credit-cards-2/dist/es/styles-compiled.css";

const creditCardNumbers = [
  "4532 1258 7896 4587",
  "5100 0811 1222 3332",
  "5066 9911 1151 1518",
  "6011 2345 6789 1234",
  "3000 1234 5678 9043",
  "3530 1234 5678 9012",
  "6221 2345 6789 0123",
  "6759 1234 5678 9012",
  "2204 1234 5678 9012",
  // Add more card numbers as needed
];

function ReactCreditCard() {
  const [preview, setPreview] = useState(false);
  const state = {
    number: creditCardNumbers[1],
    expiry: "03/24",
    cvc: "332",
    name: "your name",
    preview: preview,
    focus: preview ? "cvc" : "name",
  };

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
        // preview={state.preview}
      />
      <button
        className="arrowbutton w-[10ch] mt-4"
        onMouseLeave={() => setPreview(false)}
        onMouseEnter={() => setPreview(true)}
      >
        {"Flip"}
      </button>
    </div>
  );
}

export default ReactCreditCard;
