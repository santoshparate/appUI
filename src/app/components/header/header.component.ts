import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiserviceService } from '../../services/apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private api: ApiserviceService) { }
  autoCompleteList: any[]
  studentlist:any[]  = []
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  

  getStudentlist() {
    this.api.getDataforSearch()
      .subscribe(resdata => {
        for (const d of (resdata.body as any)) { 
          this.studentlist.push(d.name);
        }  
        this.filteredOptions = this.myControl.valueChanges
       .pipe(
         startWith(''),
        map(value => this._filter(value))
        );
        this.myControl.valueChanges.subscribe(userInput => {
          this.autoStudentlist(userInput);
      })
        
      },  
      error => {  
        console.log('There was an error while retrieving Students records.' + error);  
      });
      
  }

   ngOnInit() {

     this.getStudentlist();

    
      
  }

  autoStudentlist(input) {
    let stdList = this._filter(input)
    this.autoCompleteList = stdList;
}
      _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

     return this.studentlist.filter(option => option.toLowerCase().includes(filterValue));
 }


}
export class Studentlist {
  id: number;
  name: string;
  email: string;

}
