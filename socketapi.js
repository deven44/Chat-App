const io = require("socket.io")();
const userModel = require('./routes/users')
const messageModel = require('./routes/message')
const socketapi = {
    io:io
};

io.on("connection", function (socket) {


    socket.on('join-server', async username => {
        
       await userModel.findOneAndUpdate({
            username
        }, {
            socketId: socket.id
        })
      
    })


   socket.on('send-private-message', async messageObject => {
      await messageModel.create({
        sender:messageObject.sender,
        receiver:messageObject.receiver,
        data:messageObject.data
        })
        const receiver = await userModel.findOne({
            username:messageObject.receiver
        })
      console.log(receiver)
      
        socket.to(receiver.socketId).emit('receive-private-message',messageObject)
        
      })
       
});



module.exports = socketapi;