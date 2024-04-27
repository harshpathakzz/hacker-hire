"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface CopyURLButtonProps {
  className?: string;
}

export const CopyURLButton: React.FC<CopyURLButtonProps> = ({ className }) => {
  const [buttonText, setButtonText] = useState<string>("Copy Playground Link");

  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard();
      console.log("Success");
      setButtonText("Copied Successfully!");
      setTimeout(() => {
        setButtonText("Copy Playground Link");
      }, 3000);
    } catch (err) {
      setButtonText("Unable to copy");
      setTimeout(() => {
        setButtonText("Copy Playground Link");
      }, 3000);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleCopyToClipboard}
      className={className}
    >
      {buttonText}
    </Button>
  );
};
