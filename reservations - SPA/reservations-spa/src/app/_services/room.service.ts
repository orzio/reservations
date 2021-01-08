import { Room } from '../_models/room';
import { Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RoomOffice } from '../_models/RoomOffice';

@Injectable()
export class RoomService{

    constructor(private http: HttpClient) {}
    private readonly API_URL:string = 'http://localhost:44310/offices/rooms/';
    



    currentOfficeId = new ReplaySubject<string>();
    roomDetailsId = new ReplaySubject<string>();
    roomsChanged = new Subject<Room[]>();
    roomUpdated = new Subject<Room>();
    roomInfoChanged = new ReplaySubject<RoomOffice>();
    private rooms:Room[] = [];
    photoRoomChanged = new ReplaySubject<Room>();

    getRooms():Room[]{
        console.log("get rooms"+this.rooms.length);
        console.log(this.rooms);
        return this.rooms.slice();
    }

    // getRoomById(index:number){
    //     console.log("get room by id")
    //     console.log(this.rooms);
    //     return this.rooms[index];
    // }


    getRoomById(index:string){
        console.log("get room by id")
        console.log(this.rooms);
        return this.rooms.filter(x => x.id == index)[0];
    }


    addRoom(room:Room){
        this.http
        .post<Room>(this.API_URL,room).subscribe(response => {
            this.fetchRooms().subscribe((resopnse:Room[]) =>{
                var rooms = this.rooms.filter(x => x.officeId == room.officeId);
                this.roomsChanged.next(rooms.slice());
            })
        })
    }

    deleteRoom(index:string){
        return this.http.delete(`${this.API_URL}${index}`);
    }

    setRooms(rooms:Room[]){
        this.rooms=rooms;
        this.roomsChanged.next(this.rooms.slice());
    }

    fetchRooms(){
        return this.http.get<Room[]>(this.API_URL)
        .pipe(
            tap(rooms => {
                this.setRooms(rooms);

            })
            
        )
    }

    fetchOfficesRoom(officeId:string){
        return this.http.get<Room[]>(this.API_URL)
        .pipe(
            tap(rooms => {
                let officeRooms = rooms.filter(room => room.officeId ==officeId);
                this.setRooms(officeRooms);
            })
            
        )
    }


    updateRoom(index:string, updatedRoom:Room){
        this.http.put<Room>(`${this.API_URL}`,updatedRoom).subscribe(response =>{
            const _this = this;
            this.fetchRooms().subscribe((resp:Room[])=>{
                console.log("updated room:");
                console.dir(resp);
                console.dir(_this.rooms);
                _this.rooms = _this.rooms.filter(x => x.officeId == updatedRoom.officeId);
                _this.roomsChanged.next(_this.rooms.slice());
                _this.roomUpdated.next(_this.getRoomById(index));
            })
        })
    }

}