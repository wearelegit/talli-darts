"use client";

import { Button } from "./Button";

interface QuickScoreButtonProps {
  score: number;
  onClick: (score: number) => void;
  disabled?: boolean;
}

export function QuickScoreButton({ score, onClick, disabled }: QuickScoreButtonProps) {
  const is180 = score === 180;

  return (
    <Button
      variant="score"
      size="xl"
      onClick={() => onClick(score)}
      disabled={disabled}
      className={`
        w-full
        ${is180 ? "bg-amber-600 hover:bg-amber-700" : ""}
      `}
    >
      {score}
    </Button>
  );
}
