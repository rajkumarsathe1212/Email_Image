
let express = require("express");
let Image = require("../models/Image");
let fs = require("fs");
let Mail = require("../models/Mail");

let router = express.Router();

router.post("/sendemail",(req,res)=>{


    let body = req.body;

    let mail = new Mail();

    if(mail.sendemail(body.name,body.email,body.password)){
        res.end(JSON.stringify({status:"success"}));
    }
    else{
        res.end(JSON.stringify({status : "failed"}));   
        
    }
})


router.post("/", (req,res)=>{
    let body = req.body;
    // console.log(body);
    let object = new Image(body);
    object.name = body.name;    
    object.email = body.email;

    let logo = body.image;
    if(logo!= ""){
        let filename = (Math.random() + 1).toString(36).substring(7);
        logo = logo.split(",").pop();
        fs.writeFileSync("assets/logo/" + filename + ".png",logo,"base64");
        object.image =  "logo/" + filename + ".png";
    }

    object.save().then(result=>{
        res.end(JSON.stringify({status:"success",data:result}));
    }).catch(err=>{
        res.end(JSON.stringify({status:"failed",data:err}))
    })
})


router.get("/",(req,res)=>{
    Image.find().then(result=>{
        res.end(JSON.stringify({status : "success", data : result}));
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}));        
    })
})


router.get("/:id",(req,res)=>{
    let id = req.params.id;
    Image.findById(id).then(result=>{
        res.end(JSON.stringify({status : "success", data : result}));
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : "Record not found"}));        
    })
})


router.put("/:id", (req,res)=>{
    let id = req.params.id;
    // console.log(id);
    let body = req.body;

    let object = new Object();
    object.name = body.name;
    object.email = body.email;

     let logo = body.image;
    // console.log(logo.includes("png"));
    if(logo.includes("png") == true){
        object.image = body.image;
        
    }
    else if(logo != ""){
        let filename = (Math.random() + 1).toString(36).substring(7);
        logo = logo.split(",").pop();
        //split method is used to remove comma from the converted code
        fs.writeFileSync("assets/logo/"+ filename +".png", logo, 'base64')
        object.imagepath = "logo/" + filename + ".png";
    }

 
    // console.log(object);
    Image.findByIdAndUpdate(id,object).then(result=>{
        res.end(JSON.stringify({status : "success", data : result}));
    }).catch(err=>{

        res.end(JSON.stringify({status : "failed", data : err}));        
    })
})


router.delete("/:id",(req,res)=>{
    let id = req.params.id;
    Image.findByIdAndDelete(id).then(result=>{
        res.end(JSON.stringify({status : "success", data : result}));
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}));        
    })
})




module.exports = router;
