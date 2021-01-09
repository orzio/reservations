import { Component, OnInit, OnDestroy } from '@angular/core';
import { Calendar, EventSourceInput, EventHoveringArg } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { DeskReservationService } from '../_services/deskReservation.service';
import { DeskReservation } from '../_models/DeskReservation';
import { ActionSequence } from 'protractor';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReservationDto } from '../_models/ReservationDto';
import { reduce } from 'rxjs/operators';
import { RoomReservation } from '../_models/RoomReservation';
import { RoomReservationService } from '../_services/roomReservation.Service';
import { createEventId } from '../desk-callendar/event-utils';
import { RoomSignalRService } from '../_services/roomSignalR.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-callendar',
  templateUrl: './room-callendar.component.html',
  styleUrls: ['./room-callendar.component.css']
})
export class RoomCallendarComponent implements OnInit, OnDestroy {

  private resizeStared:EventClickArg;
  private resizeStopped:EventClickArg;
  private dragStarted:EventClickArg;
  private dragEnded:EventClickArg;
  label:string="Koniec";

  private readonly RESERVED_EVENT_STRING:string ="Zarezerwowane";
  private user:User;
  private eventTitle:string="";
  private roomId:string="";
  reservations:ReservationDto[]=[];

  calendarOptions: CalendarOptions = {
    timeZone:'UTC',
    initialView: 'timeGridWeek',
    weekends:false,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    slotMinTime:"08:00:00",
    slotMaxTime:"18:00:00",
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventOverlap:false,
    events:this.reservations,
    eventChange:this.handleEventChanged.bind(this),
    eventRemove:this.handleEventDeleted.bind(this)
  };
  currentEvents: any[];

   handleDateClick(arg) {
      // alert('date click! ' + arg.dateStr)
    }

    ngOnDestroy(): void {
      this.userSubscription?.unsubscribe();
      this.reservationSubscription?.unsubscribe();
      this.subscription?.unsubscribe();
      this.deleteReservationSubscription?.unsubscribe();
      this.updateUubscription?.unsubscribe();
     }
   
   
   userSubscription:Subscription;
   reservationSubscription:Subscription;
   subscription:Subscription;
   deleteReservationSubscription:Subscription;
   updateUubscription:Subscription;
   
    handleEventChanged(changeInfo){
      
      var uptadedReservation =  new RoomReservation(changeInfo.event.id, this.user.id, 
        this.roomId,
        new Date(changeInfo.event.start),
        new Date(changeInfo.event.end))
      
        this.updateUubscription = this.reservationService.updateReservation(uptadedReservation)
        .subscribe((data)=>{

        },
        error => {
          //console.log(error.error.error);
          changeInfo.revert();
        })

    }

  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute, 
    private router:Router,
    private reservationService: RoomReservationService, private signalRService: RoomSignalRService) {
     }

  ngOnInit(): void {

    this.userSubscription = this.authService.user.subscribe((user:User)=>{
    this.user = user;
    this.eventTitle = user.name;
    
    this.reservationSubscription= this.reservationService.currentRoomIdChanged.subscribe((roomId:string)=>{
      this.roomId = roomId;
      
    });
  })
  
  this.signalRService.startConnection();
  //console.log("SignalR----------:::::::::::::::::::::::::::::::::::::::::::::::::::::::::" + this.roomId);
  this.signalRService.addNewCallendarEventListener();

  this.handleChanges();



  }


  handleChanges(){

    this.subscription=this.reservationService.roomReservationsChanged.subscribe(
      (data:ReservationDto[])=>{
        let reservations=[];
        data.forEach(reservation => {
          let editable=reservation.userId == this.user.id ? true:false;
          // //console.log("-=-=-=-=-="+reservation.userId == this.user.id);
          let bgColor=reservation.userId == this.user.id ? "#3788d8":"#999999"
          let eventTitle = reservation.userId == this.user.id ?  this.eventTitle : this.RESERVED_EVENT_STRING
            reservations.push({
            id:reservation.id,
            title: eventTitle,
            start:reservation.startDate,
            end:reservation.endDate,
            editable: editable,
            backgroundColor: bgColor,
            borderColor:"white"
          });
          });
        this.calendarOptions.events=reservations;
      }
    )
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    const title =this.eventTitle;
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    let result = title;

      let eventId = createEventId();
      //console.log("::::"+eventId);
      let event = new RoomReservation(eventId,this.user.id,this.roomId, new Date(selectInfo.startStr),new Date(selectInfo.endStr));

      //console.log(event)
      this.reservationService.addReservation(event).subscribe((data)=> {
        
      //   if (title) {
      //     calendarApi.addEvent({
      //       id:eventId,
      //       title,
      //       start: selectInfo.startStr,
      //       end: selectInfo.endStr,
      //       editable:true
      //     });
      // };
      this.handleChanges();
    },
    error=>{
      alert("Nie mozna dodac rezerwacji");
    }
    );
  }

  handleEventClick(clickInfo: EventClickArg) {
    if(clickInfo.event.title == this.RESERVED_EVENT_STRING)
      return;

     if (confirm(`${clickInfo.event.title}, napewno chesz odwołać rezerwację?`)) 
       clickInfo.event.remove();
  }

  handleEventDeleted(removeInfo){
    this.deleteReservationSubscription = this.reservationService.deleteReservation(removeInfo.event.id).subscribe(
      (data)=>{
        this.handleChanges();
      },
      error => {
        removeInfo.revert();
      }

    )
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }



}
