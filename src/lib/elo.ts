const K_FACTOR = 32;
const DEFAULT_ELO = 1000;

export function calculateExpectedScore(playerElo: number, opponentElo: number): number {
  return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
}

export function calculateNewElo(
  playerElo: number,
  opponentElo: number,
  won: boolean
): number {
  const expectedScore = calculateExpectedScore(playerElo, opponentElo);
  const actualScore = won ? 1 : 0;
  return Math.round(playerElo + K_FACTOR * (actualScore - expectedScore));
}

export function calculateMultiplayerElo(
  players: { id: string; elo: number }[],
  winnerId: string
): { id: string; newElo: number; change: number }[] {
  return players.map((player) => {
    let totalChange = 0;

    // Calculate ELO change against each opponent
    for (const opponent of players) {
      if (opponent.id === player.id) continue;

      const won = player.id === winnerId;
      const newElo = calculateNewElo(player.elo, opponent.elo, won);
      totalChange += newElo - player.elo;
    }

    // Average the change across opponents
    const avgChange = Math.round(totalChange / (players.length - 1));

    return {
      id: player.id,
      newElo: player.elo + avgChange,
      change: avgChange,
    };
  });
}

export { DEFAULT_ELO, K_FACTOR };
