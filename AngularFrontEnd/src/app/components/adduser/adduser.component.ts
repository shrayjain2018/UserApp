import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

  addForm: FormGroup;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userservice: UserService) { }

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.userservice.createUser(this.addForm.value).subscribe(data => {
      alert('New user added!!')
      this.router.navigate(['/list-user']);
    });

  }
}
