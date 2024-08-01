import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private AuthService:AuthService, private http : HttpClient) {}
  invalidData:boolean = false;
  errorMsg = null;
  btnText: string = 'Login';
  onBtnLoading(state:string) {
    if(state === "loading") {
      this.btnText = "Loading...";
    } else if (state === "loaded") {
      this.btnText = "Login";
    }
  }

  onSubmit(form: NgForm) {
    this.onBtnLoading("loading");
    this.AuthService.login(form.value.username, form.value.password).subscribe(resData => {
      console.log(resData)
      this.onBtnLoading("loaded");
      this.AuthService.onSuccess(resData)
    }, error => {
      this.invalidData = true;
      this.errorMsg = (error.error.message)
      this.onBtnLoading("loaded");

    });

  }
}
