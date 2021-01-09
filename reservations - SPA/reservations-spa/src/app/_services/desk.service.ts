import { Room } from '../_models/room';
import { Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Desk } from '../_models/desk';
import { DeskOffice } from '../_models/DeskOffice';

@Injectable()
export class DeskService{

    constructor(private http: HttpClient) {}
    private readonly API_URL:string = 'http://localhost:44310/offices/desks/';
    
    desksChanged = new Subject<Desk[]>();
    deskInfoChanged = new ReplaySubject<DeskOffice>();
    private desks:Desk[] = [];

    getDesks():Desk[]{
        //console.log("get desks"+this.desks.length);
        //console.log(this.desks);
        return this.desks.slice();
    }

    getDeskById(index:string){
        //console.log("get room by id")
        //console.log(this.desks);
        return this.desks.filter(x => x.id ==index)[0];
    }


    addDesk(desk:Desk){
        this.http
        .post<Desk>(this.API_URL,desk).subscribe(response => {
            this.fetchdesks().subscribe((resopnse:Desk[]) =>{
                var desks = this.desks.filter(x => x.officeId == desk.officeId);
                this.desksChanged.next(desks.slice());
            })
        })
    }
    
    deleteDesk(index:string){
        return this.http.delete(`${this.API_URL}${index}`);
    }

    setDesks(desks:Desk[]){
        this.desks=desks;
        this.desksChanged.next(this.desks.slice());
    }

    fetchdesks(){
        return this.http.get<Desk[]>(this.API_URL)
        .pipe(
            tap(desks => {
                this.setDesks(desks);
                //console.log(this.desks);
            })
            
        )
    }


    fetchOfficesdesks(officeId:string){
        return this.http.get<Desk[]>(this.API_URL)
        .pipe(
            tap(desks => {
                let officeDesks = desks.filter(desk => desk.officeId == officeId);
                this.setDesks(officeDesks);
                //console.log(this.desks);
            })
            
        )
    }

}