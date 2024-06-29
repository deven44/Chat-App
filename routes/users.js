const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://0.0.0.0/whatsappclone')

const userSChema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  profileImage: {
    type: String,
    default: "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw"
  },
  socketId: String,
  friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }],
  joinedGroups:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'group'
  }]
})

userSChema.plugin(plm)

module.exports = mongoose.model('user', userSChema)