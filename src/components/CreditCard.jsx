import React from "react";

const CreditCard = ({ cardColor }) => {
  // Define an array of color classes from Tailwind CSS to apply to the card
  const cardColors = {
    default: "bg-gray-400",
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    // Add more color options as needed
  };

  // Get the corresponding color class based on the prop or default to 'default'
  const colorClass = cardColors[cardColor] || cardColors["default"];

  return (
    <div className={`p-4 w-64 h-32 rounded-lg shadow-lg ${colorClass}`}>
      {/* Credit card content */}
      <div className="flex justify-between items-center mb-2">
        <img
          src="https://via.placeholder.com/60x40"
          alt="Card Logo"
          className="h-6 w-12"
        />
        <img
          src="https://via.placeholder.com/60x40"
          alt="Chip"
          className="h-6 w-12"
        />
      </div>
      <div className="text-white text-lg font-bold">Card Number</div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-white">Card Holder</div>
        <div className="text-sm text-white">Expiry Date</div>
      </div>
    </div>
  );
};

export default CreditCard;
