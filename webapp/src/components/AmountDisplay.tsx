"use client";

import React from "react";
import useCurrency from "@/hooks/useCurrency";

interface AmountDisplayProps {
  /** 
   * The numeric amount to display (e.g., 49.99)
   */
  amount: number | string;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({ amount }) => {
  const { currency } = useCurrency();

  return (
    <span>
      {currency} {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  );
};

export default AmountDisplay;
