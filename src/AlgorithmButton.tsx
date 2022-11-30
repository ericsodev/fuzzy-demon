import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  selectedAlgo: string;
  setAlgo: React.Dispatch<React.SetStateAction<string>>;
  algoName: string;
  algoId: string;
}
export default function AlgorithmButton({
  selectedAlgo,
  setAlgo,
  algoId,
  algoName,
}: ButtonProps): JSX.Element {
  return (
    <Button
      onClick={() => {
        setAlgo(algoId);
      }}
      colorScheme={algoId === selectedAlgo ? "green" : "gray"}
    >
      {algoName}
    </Button>
  );
}
