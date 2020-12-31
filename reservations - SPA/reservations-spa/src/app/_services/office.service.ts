import { Injectable, EventEmitter } from '@angular/core';
import { Office } from '../_models/Office';
import { Subject, Subscription, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../_models/room';
import { AuthService } from './auth.service';
import { City } from '../_models/City';

@Injectable()
export class OfficeService{

  constructor(private http: HttpClient, private authService:AuthService) {}
  private readonly API_URL:string = 'http://localhost:44310/offices';

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
        .put<Office>('http://localhost:44310/offices',updatedOffice).subscribe(response =>{
            this.fetchUserOffices().subscribe((resp:Office[]) =>{
              this.officesChanged.next(resp.slice());
              this.officeUpdated.next(this.getOfficeById(index));
            })
            }
        );
      }

      deleteOffice(index:number){
        const office = this.getOfficeById(index);
       return  this.http.delete(`http://localhost:44310/offices/${office.id}`);
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

      let userId;
       this.authService.user.subscribe(user => {
        userId = user.id;
      })
      
      return this.http
    .get<Office[]>(
        `${this.API_URL}/user/${userId}`)
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

fetchOfficesDesksInCity(city:string){
  return this.http
.get<Office[]>(
    `${this.API_URL}/desks/city/${city}`)
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




fetchOfficesRoomsInCity(city:string){
  return this.http
.get<Office[]>(
    `${this.API_URL}/rooms/city/${city}`)
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