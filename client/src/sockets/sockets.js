import io from 'socket.io-client'
import config from '../config.json'

class SocketsClient {
    connect() {
        this.socket = io(config.hostServer)
    }

    disconnect() {
        this.socket.emit('disconnection-client')
        this.socket.off()
    }
}


export const socketsClient = new SocketsClient()