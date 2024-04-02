const mongoose=require('mongoose');
const dotenv=require('dotenv')

dotenv.config()

const db=async()=>{
    try{
        const mongo_uri = "mongodb+srv://nasim:nasim12345@user.gkn6b2p.mongodb.net/?retryWrites=true&w=majority&appName=User";
        if(mongo_uri){
            await mongoose.connect(mongo_uri)
            console.log("Connected to database")
        }
    }catch(err){
        throw new Error("Error to establish database connection:"+err)
    }
}

module.exports={db};

