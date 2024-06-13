export type ServerToClientEvents = {
  updateCounter: (clicks: number, activeUsers: number) => void
}
export type ClientToServerEvents = {
  click: (callback: (clicks: number, activeUsers: number) => void) => void
  getInitialValues: (callback: (clicks: number, activeUsers: number) => void) => void
}
