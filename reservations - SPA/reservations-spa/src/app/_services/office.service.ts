import { Injectable, EventEmitter } from '@angular/core';
import { Office } from '../_models/Office';
import { Subject, Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../_models/room';

@Injectable()
export class OfficeService{

  constructor(private http: HttpClient) {}
  private readonly API_URL:string = 'https://localhost:44310/offices';

  officesChanged = new Subject<Office[]>();
  private offices: Office[]=[];
  officeUpdated = new Subject<Office>();
  roomsUpdated = new Subject<Room[]>();

  getRooms(index:number){
  const rooms = this.getOfficeById(index).rooms;
  this.roomsUpdated.next(rooms.slice());
}

      getOffices(){
          return this.offices.slice();
      }

      getOfficeById(index:number){
        console.log(`GetOfficeById :${this.offices[index].description}`);
        return this.offices[index];
      }

      addOffice(office:Office){
        this.http
        .post<Office[]>(this.API_URL,office).subscribe(response =>{
         console.log("dodalem biuro");
         console.log(office)
        this.fetchOffices().subscribe((response:Office[]) =>
            {
                this.officesChanged.next(response.slice())
            });
    }
        )

      }

      updateOffice(index:number, updatedOffice:Office){
        this.http
        .put<Office>('https://localhost:44310/offices',updatedOffice).subscribe(response =>{
            this.fetchOffices().subscribe((resp:Office[]) =>{
              this.officesChanged.next(resp.slice());
              this.officeUpdated.next(this.getOfficeById(index));
            })
            }
        );
      }

      deleteOffice(index:number){
        const office = this.getOfficeById(index);
       return  this.http.delete(`https://localhost:44310/offices/${office.id}`);
      }

      setOffices(offices:Office[]){
        this.offices = offices;
        console.log("jestem w set");
        console.log(this.offices);
        this.officesChanged.next(this.offices.slice());
      }

      fetchOffices(){
        return this.http
        .get<Office[]>(
            this.API_URL
        ).pipe(
            map(offices => {
                return offices.map(office =>{
                    console.log(office);
                    return {
                    ...office,
                    rooms:office.rooms ? office.rooms : [],
                    desks:office.desks ? office.desks : []
                    };
                });
            }),
            tap(offices =>{
                this.setOffices(offices);

                console.log("w tap ustawiam office")
            })
        )
    }

}