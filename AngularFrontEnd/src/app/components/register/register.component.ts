import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user'
import { UserReg } from '../../model/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  submitted: boolean = false;
  invalidRegister: boolean = false;

  user: User[];
  userReg: UserReg[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let email = this.registerForm.controls.email.value;

    let isMatch: boolean = false;

    for (let u of this.userReg) {
      if (email == u.email) {
        this.invalidRegister=true;
        return;
      }
    }

    this.userService.registerUser(this.registerForm.value)
      .subscribe(data => {
        alert("Registration Success!!");
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.userService.getRegUser()
      .subscribe(data => {
        this.userReg = data;
      });
  }

}
