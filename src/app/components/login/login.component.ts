import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm:FormGroup
    submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
   
  constructor( private router: Router, private authService: AuthService) { 
   
  }


  ngOnInit() {
    this.authService.logout();
    this.loginForm = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),
   password: new FormControl('', [Validators.required])
  })
    
}
get email() { return this.loginForm.get('email'); }
get password() { return this.loginForm.get('password'); }

onLogin(){
  this.submitted = true;
  this.authService.login(this.email.value, this.password.value).subscribe((data) => { 
   
    if (this.authService.isLoggedIn()) {
      
        this.router.navigate(['/members']);
      } else {
        this.loginError = 'Username or password is incorrect.';
        
      }

      
    },
    error => this.error = error
  );
}
}
