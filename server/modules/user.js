var mongoose=require("mongoose");
const UserSchema = new mongoose.Schema({
   id: {
       type: Number,
       required: true
   },
   first_name: {
       type: String,
       required: true
   },
   last_name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   gender: {
       type: String,
       enum: ['Male', 'Female'],
       required: true
   },
   avatar: {
       type: String,
       required: true
   },
   domain: {
       type: String,
       required: true
   },
   available: {
       type: Boolean,
       required: true
   }
});


const User = mongoose.model('heliverse', UserSchema);



module.exports = User;
