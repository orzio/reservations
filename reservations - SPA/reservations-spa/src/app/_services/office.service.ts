import { Injectable, EventEmitter } from '@angular/core';
import { Office } from '../_models/Office';
import { Subject, Subscription, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../_models/room';
import { AuthService } from './auth.service';

@Injectable()
export class OfficeService{

  constructor(private http: HttpClient, private authService:AuthService) {}
  private readonly API_URL:string = 'https://localhost:44310/offices';

  officesChanged = new Subject<Office[]>();
  private offices: Office[]=[];
  officeUpdated = new Subject<Office>();
  roomsUpdated = new Subject<Room[]>();


  getRooms(index:number){
  const rooms = this.getOfficeById(index).rooms;
  this.roomsUpdated.next(rooms.slice());
}

getUserOffice(){
  return this.offices.slice();
}



      getOffices(){
          return this.offices.slice();
      }

      getOfficeById(index:number){
        console.log("index: + "+index);
        let off= this.offices[index];
        console.log(off);
        console.log(`GetOfficeById :${this.offices[index].description}`);
        return off;
      }

      addOffice(office:Office){
        this.http
        .post<Office[]>(this.API_URL,office).subscribe(response =>{
         console.log("dodalem biuro");
         console.log(office)
        this.fetchUserOffices().subscribe((response:Office[]) =>
            {
                this.officesChanged.next(response.slice())
            });
    }
        )

      }

      updateOffice(index:number, updatedOffice:Office){
        this.http
        .put<Office>('https://localhost:44310/offices',updatedOffice).subscribe(response =>{
            this.fetchUserOffices().subscribe((resp:Office[]) =>{
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
            this.API_URL)
            .pipe(
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
      }))
    }
    

    fetchUserOffices(){
      return this.http
    .get<Office[]>(
        `${this.API_URL}/user/${this.authService.user.value.id}`)
        .pipe(
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
  }))
}





}