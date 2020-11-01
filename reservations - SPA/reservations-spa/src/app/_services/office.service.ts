import { Injectable, EventEmitter } from '@angular/core';
import { Office } from '../_models/Office';
import { Subject } from 'rxjs';
import { DataStorageService } from '../_repositories/offices-storage.service';

@Injectable()
export class OfficeService{

officesChanged = new Subject<Office[]>();

   private offices: Office[]=[];

      getOffices(){
          return this.offices.slice();
      }

      getOfficeById(index:number){
        return this.offices[index];
      }

      addOffice(office:Office){
        this.offices.push(office);
        this.officesChanged.next(this.offices.slice());
      }

      updateOffice(index:number, newOffice:Office){
        this.offices[index]=newOffice;
        console.log(newOffice);
        this.officesChanged.next(this.offices.slice());
      }

      deleteOffice(index:number){
        this.offices.splice(index,1);
        this.officesChanged.next(this.offices.slice());
      }

      setOffices(offices:Office[]){
        this.offices = offices;
        this.officesChanged.next(this.offices.slice());
        }


}