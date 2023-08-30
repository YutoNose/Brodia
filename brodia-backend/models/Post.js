const mongoose = require("mongoose");

//NoSQL vs SQL
//mongoDBのメリットは、スキーマに応じてデータ構造を自由に変更できること。
const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        max: 200,
    },
    img:{
        type: String,
    },
    likes:{
        type:Array,
        default:[],
    }, 
},
{timestamps: true}
);

module.exports = mongoose.model("Post",PostSchema);