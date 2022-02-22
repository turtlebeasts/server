const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

app.use(express.static('public'))
app.use('*', express.static('public/error.html'))

server.listen(process.env.PORT || 3000)

io.on('connection', (socket) => {
    socket.emit('connected', socket.id)
    const sockid = socket.id
    socket.on('message', data => {
        io.emit('recieve', { data, sockid })
    })
    socket.on('typing', data => {
        socket.broadcast.emit('userTyping', data)
    })
})
