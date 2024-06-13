export type ServerToClientEvents = {
  updateCounter: (clicks: number, activeUsers: number) => void
}

export type ClientToServerEvents = {
  click: () => void
}
