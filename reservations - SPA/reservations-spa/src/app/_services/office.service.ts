import { Injectable, EventEmitter } from '@angular/core';
import { Office } from '../_models/Office';
import { Subject } from 'rxjs';

@Injectable()
export class OfficeService{

officesChanges = new Subject<Office[]>();

   private offices: Office[] =[
        new Office("SmartOffice","Aleja Politechniki 1","Łodz", "93-590", "Fajne biuro z lamusem za ladą"),
        new Office("CoworkPort","Portowa","Łodz", "93-511", "Zbieranina dla żuli"),
        new Office("SkyHub","Piłsudskiego","Łodz", "93-533", "Widok z okna jak talala")
      ];

      getOffices(){
          return this.offices.slice();
      }

      getOfficeById(index:number){
        return this.offices[index];
      }

      addOffice(office:Office){
        this.offices.push(office);
        this.officesChanges.next(this.offices.slice());
      }

      updateOffice(index:number, newOffice:Office){
        this.offices[index]=newOffice;
        this.officesChanges.next(this.offices.slice());
      }

      deleteOffice(index:number){
        this.offices.splice(index,1);
        this.officesChanges.next(this.offices.slice());
      }

}