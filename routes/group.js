const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:String,
    profileImage: {
        type: String,
        default: "https://imgs.search.brave.com/2-K7uz4niNHqeXNhXnN2Bnmse5Ck1hT504bVgG1sm0A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kM3N4/c2htbmNzMTB0ZS5j/bG91ZGZyb250Lm5l/dC9pY29uL3ByZW1p/dW0vcG5nLTI1Ni8x/Njg4NTk1LnBuZz90/b2tlbj1leUpoYkdj/aU9pSm9jekkxTmlJ/c0ltdHBaQ0k2SW1S/bFptRjFiSFFpZlFf/Xy5leUpwYzNNaU9p/SmtNM040YzJodGJt/TnpNVEIwWlM1amJH/OTFaR1p5YjI1MExt/NWxkQ0lzSW1WNGND/STZNVGN4TURJek16/UXdPU3dpY1NJNmJu/VnNiQ3dpYVdGMElq/b3hOekE1T1RjME1q/QTVmUV9fLjgxYmJm/MWM5MDJjZDVmMWE5/YzY5MWJiZGI3NTc3/MTAyYTcwZTRhOWY5/NDY0NTEyNmEyNjZm/ZWEzMGNmNmM2YjA"
      },
    members:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
    }],
   
})


module.exports = mongoose.model('group', groupSchema)