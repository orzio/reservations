import { Component, OnInit } from '@angular/core';
import { Calendar, EventSourceInput, EventHoveringArg } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { createEventId } from './event-utils';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ReservationService } from '../_services/reservation.service';
import { Reservation } from '../_models/Reservation';
import { ActionSequence } from 'protractor';
import { ActivatedRoute, Params } from '@angular/router';
import { ReservationDto } from '../_models/ReservationDto';

@Component({
  selector: 'app-callendar',
  templateUrl: './callendar.component.html',
  styleUrls: ['./callendar.component.css']
})
export class CallendarComponent implements OnInit {

  private user:User;
  private eventTitle:string="";
  private deskId:string="";
  reservations:ReservationDto[]=[];

  calendarOptions: CalendarOptions = {
    timeZone:'UTC',
    initialView: 'timeGridWeek',
    weekends:false,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    editable: true,
    slotMinTime:"08:00:00",
    slotMaxTime:"18:00:00",
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventOverlap:false,
    eventResizeStart:this.handleResizeStart.bind(this),
    eventResizeStop:this.handleResizeStop.bind(this),
    eventDragStart:this.handleDragStart.bind(this),
    eventDragStop:this.handleDragStop.bind(this),
    eventMouseEnter:this.handleMouseEnter.bind(this),
    eventMouseLeave:this.handleMouseLeave.bind(this),
    events:this.reservations
  };
  currentEvents: any[];

   handleDateClick(arg) {
      alert('date click! ' + arg.dateStr)
    }


    handleDragStart(clickInfo: EventClickArg){
console.log("Dr-starded");
    }

    handleDragStop(clickInfo: EventClickArg){
      console.log("Dr-ended");
    }


  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute, 
    private reservationService: ReservationService) {
     }

  ngOnInit(): void {
    this.authService.user.subscribe((user:User)=>{
    this.user = user;
    this.eventTitle = user.name;
    })

    this.activatedRoute.params.subscribe((params:Params) =>{
      this.deskId = params['deskId'];

    })

    this.reservationService.fetchDeskReservations(this.deskId).subscribe(
      (data:ReservationDto[])=>{
        let reservations=[];
        data.forEach(reservation => {
        reservation.title= "test";

          reservations.push({
            id:reservation.id,
            title:"test",
            start:reservation.startDate,
            end:reservation.endDate
          });

          console.log(reservations);

          }
          );
        console.log("eventy");
        this.calendarOptions.events=reservations;
        console.log(this.calendarOptions.events); 
      }
    )
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title =this.eventTitle;
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    let result = title;
    console.log();
    

      console.log("user-callendar");
      console.log(this.user);
      let eventId = createEventId();
      let event = new Reservation(eventId,this.user.id,this.deskId, new Date(selectInfo.startStr),new Date(selectInfo.endStr));

      this.reservationService.addReservation(event).subscribe((data)=> {
        
        if (title) {
          calendarApi.addEvent({
            id:eventId,
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
          });

        console.log("w subsctibe");
        console.log(data);
      };




    },
    error=>{
alert("Nie mozna dodac rezerwacji");

    }
    );



  }

  handleEventClick(clickInfo: EventClickArg) {
    alert(`${clickInfo.event.id},${clickInfo.event.title},${clickInfo.event.start},${clickInfo.event.end}` );
    // if (confirm(`Napewno chesz odwołać rezerwację? '${clickInfo.event.title}'`)) {
    //   // clickInfo.event.remove();
      
    //   console.log(clickInfo);
    // }
  }



  handleResizeStop(clickInfo: EventClickArg) {
    console.log("Resizing ended");
}

handleResizeStart(clickInfo: EventClickArg) {
  console.log("Resizing started");
}


  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }



  
  handleMouseLeave(mouseLeaveInfo:EventHoveringArg){
    console.log("Mouse Leaved");
  }
   handleMouseEnter(mouseLeaveInfo :EventHoveringArg){

    console.log("Mouse entered");
     
   }

}
