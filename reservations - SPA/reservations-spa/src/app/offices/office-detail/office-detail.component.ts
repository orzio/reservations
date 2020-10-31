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
id:number;

  constructor(private officeService: OfficeService,
    private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.office = this.officeService.getOfficeById(this.id);
    });
  }

  onDelete(){
    this.officeService.deleteOffice(this.id);
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }

}
