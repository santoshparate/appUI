import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  
  constructor(private authService: AuthService, public router: Router){
    
  }
  title = 'protoApp';

  ngOnInit() {}

  logout(){
    
     this.authService.logout();
     this.router.navigate(['/login']);
     
  }
   
  
}
