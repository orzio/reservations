import { Room } from '../_models/room';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RoomService{

    constructor(private http: HttpClient) {}
    private readonly API_URL:string = 'https://localhost:44310/offices/rooms/';
    
    roomsChanged = new Subject<Room[]>();
    roomUpdated = new Subject<Room>();
    private rooms:Room[] = [];

    getRooms():Room[]{
        console.log("get rooms"+this.rooms.length);
        console.log(this.rooms);
        return this.rooms.slice();
    }

    getRoomById(index:number){
        console.log("get room by id")
        console.log(this.rooms);
        return this.rooms[index];
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

    deleteRoom(index:number){
        const room = this.getRoomById(index);
        return this.http.delete(`${this.API_URL}${room.id}`);
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
                console.log(this.rooms);
            })
            
        )
    }

    updateRoom(index:number, updatedRoom:Room){
        this.http.put<Room>(`${this.API_URL}`,updatedRoom).subscribe(response =>{
            this.fetchRooms().subscribe((resp:Room[])=>{
                console.log("updated room:");
                console.dir(updatedRoom);
                this.rooms = this.rooms.filter(x => x.officeId == updatedRoom.officeId);
                this.roomsChanged.next(this.rooms.slice());
                this.roomUpdated.next(this.getRoomById(index));
            })
        })
    }

}