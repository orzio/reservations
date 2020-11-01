import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { OfficeService } from '../_services/office.service';
import { Office } from '../_models/Office';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private officeService: OfficeService) {}

    addOffices(){
        const offices = this.officeService.getOffices();
        this.http
        .post('https://localhost:44310/offices',
        offices).subscribe(response =>
            console.log(response));
    }

    addSingleOffice(){
        var office = this.getLastOffice()
        this.http
        .post('https://localhost:44310/offices',office).subscribe(response =>{

        const newList = this.fetchOffices().subscribe(resp =>
            console.log(newList));
            this.officeService.officesChanged.next(newList.slice())
    }
        )
    }
    

    updateSingleOffice(){
        var office = this.getLastOffice();
        this.http
        .put('https://localhost:44310/offices',office).subscribe(response =>{
            const newList = this.fetchOffices().subscribe(resp =>
                this.officeService.officesChanged.next(newList.slice()))});
        }

    


    fetchOffices(){
        return this.http
        .get<Office[]>(
            'https://localhost:44310/offices'
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
                this.officeService.setOffices(offices);
            })
        )
    }

    private getLastOffice():Office{
        const offices = this.officeService.getOffices();
        return offices[offices.length-1];
    }

}

