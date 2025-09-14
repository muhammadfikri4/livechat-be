import { WebSocketServer, WebSocket } from 'ws'
import { prisma } from '../config'

interface ChatMessage {
  senderId: string
  content: string
  roomId: string
}

const clients = new Map<WebSocket, string>() // WebSocket -> userId

export function setupWebSocket(server: any) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws) => {
    console.log('New client connected')

    ws.on('message', async (data) => {
      const { type, payload } = JSON.parse(data.toString())

      // Optional: attach user ID to socket (e.g., after auth)
      if (type === 'init') {
        clients.set(ws, payload.userId)
        return
      }

      if (type === 'message') {
        const { senderId, content, roomId } = payload as ChatMessage

        // Simpan pesan
        await prisma.message.create({
          data: {
            content,
            senderId,
            roomId,
          },
        })

        // Ambil semua user di room ini
        const roomUsers = await prisma.roomUser.findMany({
          where: { roomId },
          include: { user: true },
        })

        // Kirim ke semua socket client yang berada di room
        for (const [client, userId] of clients.entries()) {
          const isInRoom = roomUsers.some((ru) => ru.userId === userId)
          if (isInRoom && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'message', payload }))
          }
        }
      }

      if (type === 'typing') {
        const { senderId, roomId } = payload

        const roomUsers = await prisma.roomUser.findMany({
          where: { roomId },
        })

        for (const [client, userId] of clients.entries()) {
          const isInRoom = roomUsers.some((ru) => ru.userId === userId)
          if (isInRoom && userId !== senderId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'typing', payload }))
          }
        }
      }
    })

    ws.on('close', () => {
      clients.delete(ws)
    })
  })
}
