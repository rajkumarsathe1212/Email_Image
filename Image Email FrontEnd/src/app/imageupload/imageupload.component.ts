import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit{

  formdata:any;
  datas:any;
  id:any = "";

  constructor(public api:ApiService){}

  ngOnInit(): void {
    this.load();
  }


  load(){

    this.id = "";

    this.api.get("images").subscribe((result:any)=>{
      this.datas = result.data;
    })

    this.formdata = new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      email:new FormControl("",Validators.compose([Validators.required])),
      image:new FormControl("")
    })
  }

  // below function is used to convert image into base64 string format
  imagechanged(event:any){
    // console.log(event.target);
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        // console.log(reader.result.toString())

        this.formdata.patchValue({
          image: reader.result.toString().split(",").pop()
        })
      }
    }
  }


  sendemail(id:any){
    this.api.get("images/" + id).subscribe((result:any)=>{
      console.log(result);

      let object = new Object({
        name:result.data.name,
        email:result.data.email,
        password:result.data.password
      })

      this.api.post("images/sendemail",object).subscribe((result:any)=>{
        console.log(result);
      })
    })
  }

  submit(data:any){
    if(this.id == ""){

      if(data.image == ""){
        alert("Please select image");
        return;
      }

      this.api.post("images",data).subscribe((result:any)=>{

        // console.log(result);
        this.load();
      })
    }
    else{
      this.api.put("images/" + this.id,data).subscribe((result:any)=>{
        this.load();
      })
    }

  }

  refresh(){
    this.load();
  }


  edit(id:any){
    // console.log("hiiii");
    this.id = id;
    this.api.get("images/" + id).subscribe((result:any)=>{
      this.formdata.patchValue({
        name: result.data.name,
        email: result.data.email,
        image: result.data.image
      })
    })
  }

  delete(id:any){
    this.api.delete("images/" + id).subscribe((result:any)=>{
      if(result.status == "success"){
        this.load();
      }
      else{
        alert("something went wrong")
      }
    })
  }


  getemail(id:any){
    this.id = id;
    this.api.get("admins/" + id).subscribe((result:any)=>{
      console.log(result);

    })
  }

}

