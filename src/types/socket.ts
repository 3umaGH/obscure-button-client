export type LeaderUser = { id: string; clicks: number }

export type ServerToClientEvents = {
  updateCounter: (clicks: number, activeUsers: number) => void
  updateLeaders: (leaderboard: LeaderUser[]) => void
}
export type ClientToServerEvents = {
  click: (callback: (clicks: number, activeUsers: number) => void) => void
  getInitialValues: (callback: (clicks: number, activeUsers: number, leaderboard: LeaderUser[]) => void) => void
}
