import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})

export class ListuserComponent implements OnInit {

  users: User[];
  editForm: FormGroup;
  submitted: boolean = false;

  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("sessionID") != null) {
      this.userservice.getUsers().subscribe(data => {
        this.users = data;
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  deleteUser(user: User): void {
    let result = confirm("Do you want to delete this user?")
    if (result) {
      this.userservice.deleteUser(user.id).subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
    }
  }

  adduser(): void {
    this.router.navigate(['/add-user']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
  }

  logOutUser(): void {
    if (sessionStorage.getItem("sessionID") != null) {
      sessionStorage.removeItem("sessionID");
      this.router.navigate(['/login']);
    }
  }

}
