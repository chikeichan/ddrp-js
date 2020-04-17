export interface Peer {
  peerId: string
  ip: string
  port: number
  isBanned: boolean
  sentBytes: number
  receivedBytes: number
}
