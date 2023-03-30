import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageuploadComponent } from './imageupload/imageupload.component';

const routes: Routes = [
  {path:"",component:ImageuploadComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
