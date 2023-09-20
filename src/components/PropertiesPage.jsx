import React from "react";
import Properties from "./Properties";

export default function PropertiesPage({ bidderId, balance, setBalance }) {
  return (
    <div className="pt-1">
      <Properties bidderId={bidderId} />
    </div>
  );
}
