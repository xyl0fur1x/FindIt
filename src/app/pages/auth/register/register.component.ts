import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private AuthService:AuthService, private http : HttpClient) {}
  invalidData : boolean = false;
  errorMsg = null;
  btnText: string = 'Register';
  onBtnLoading(state:string) {
    if(state === "loading") {
      this.btnText = "Loading...";
    } else if (state === "loaded") {
      this.btnText = "Register";
    }
  }
  


  onSubmit(form: NgForm) {
    this.onBtnLoading("loading");
    this.AuthService.register(form.value.userName, form.value.password).subscribe(resData => {
      console.log(resData)
      this.onBtnLoading("loaded");

      this.AuthService.login(form.value.userName, form.value.password).subscribe(resData => {
        console.log(resData)
        this.onBtnLoading("loaded");
        this.AuthService.onSuccess(resData)

      }, error => {
        this.invalidData = true;
        this.errorMsg = (error.error.message)
        this.onBtnLoading("loaded");
      });

    }, error => {
      this.invalidData = true;
      this.errorMsg = (error.error.message);
      this.onBtnLoading("loaded");
    });
  }
}
