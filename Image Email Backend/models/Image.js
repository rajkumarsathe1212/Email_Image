let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        name: {type:String , required:true},
        email: {type:String , required:true},
        image: {type:String , required:true}
    }
)

let Image = mongoose.model("images",schema);

module.exports = Image;
