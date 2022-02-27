import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-wow-login',
  templateUrl: './wow-login.component.html',
  styleUrls: ['./wow-login.component.scss']
})
export class WowLoginComponent implements OnInit {

  
  formData!: any;

  constructor(
    private loginService: LoginService, private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
    localStorage.clear();
  }

  createForm(){
    this.formData = new FormGroup({
      user: new FormControl( 'user@isg.us', [Validators.required]),
      password: new FormControl('user@isg.us', [Validators.required])
    })
  }

  async onSubmit(){
    if( this.formData.invalid ) return;

    const user = this.formData.value;

    //dispath event login
    await this.loginService.doLogin(user).subscribe((response:any) => {
      if( response && response.token ){
        localStorage.setItem('token', response.token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.router.navigate(['./address']);
      }else{
        if( response.error ){
          console.table(response.error);
          return response.error;
        }
      }
    });
  }
}

