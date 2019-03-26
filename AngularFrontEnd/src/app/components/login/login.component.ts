import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserReg } from '../../model/user'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  userReg: UserReg[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userService.getRegUser()
      .subscribe(data => {
        this.userReg = data;
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;

    let isMatch: boolean = false;

    for (let u of this.userReg) {
      if (email == u.email && password == u.password) {
        isMatch = true;
        sessionStorage.setItem("sessionID", "6a8vXNmPGYn2vgTHlLKwAgdt2");
        this.router.navigate(['list-user']);
      }
    }

    if (!isMatch) {
      this.invalidLogin = true;
    }

  }

}
