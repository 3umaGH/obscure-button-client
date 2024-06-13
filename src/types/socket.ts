//export type ServerToClientEvents = {}

export type ClientToServerEvents = {
  click: (callback: (clicks: number, activeUsers: number) => void) => void
  getInitialValues: (callback: (clicks: number, activeUsers: number) => void) => void
}
