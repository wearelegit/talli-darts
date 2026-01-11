interface ScoreDisplayProps {
  playerName: string;
  remaining: number;
  isCurrentPlayer?: boolean;
  legsWon?: number;
  setsWon?: number;
}

export function ScoreDisplay({
  playerName,
  remaining,
  isCurrentPlayer = false,
  legsWon = 0,
  setsWon = 0,
}: ScoreDisplayProps) {
  return (
    <div
      className={`
        flex flex-col items-center p-4 rounded-xl
        ${isCurrentPlayer ? "bg-green-900/50 ring-2 ring-green-500" : "bg-slate-800"}
      `}
    >
      <span className="text-slate-400 text-sm mb-1">{playerName}</span>
      <span className="text-5xl font-bold tabular-nums">{remaining}</span>
      {(legsWon > 0 || setsWon > 0) && (
        <div className="flex gap-2 mt-2 text-sm text-slate-400">
          {setsWon > 0 && <span>Sets: {setsWon}</span>}
          <span>Legs: {legsWon}</span>
        </div>
      )}
    </div>
  );
}
