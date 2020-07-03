import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiserviceService } from '../../services/apiservice.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  dataSource: any;
   constructor(private api: ApiserviceService,private router: Router, private authService: AuthService) { 

    if (!this.authService.isLoggedIn) {
        
      this.router.navigate(['/login']);
    }
   }

   
    displayedColumns: string[] = ['id', 'name', 'email'];
    
     
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
 getStudentRecords() {
    this.api.getData()
      .subscribe(resdata => {
        this.dataSource = new MatTableDataSource();  
        this.dataSource.data = resdata.body; 
        this.dataSource.paginator = this.paginator; 
        },  
      error => {  
        console.log('There was an error while retrieving Students records.' + error);  
      });
     
     
  }

  ngOnInit() {
    this. getStudentRecords();
    

  }}

  export interface StudentRecords {
    name: string;
    id: number;
    email: string;
  }

  