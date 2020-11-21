import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { OfficeService } from 'src/app/_services/office.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
office:Office;
index:number;

  constructor(private officeService: OfficeService,
    private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params:Params)=>{
      this.index=+params['id'];
      this.office = this.officeService.getOfficeById(this.index);
    });
    this.officeService.officeUpdated.subscribe((resp:Office)=>{
      this.office = resp
    })
  }

  onDelete(){
    this.officeService.deleteOffice(this.index).subscribe(response =>{
      this.officeService.fetchUserOffices().subscribe(response =>{
        this.officeService.officesChanged.next(response);
        this.router.navigate(['../'],{relativeTo:this.activatedRoute});
      });

    })
  }

}

