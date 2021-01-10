import { Pipe, PipeTransform } from '@angular/core';import { ReservationStatus } from 'src/app/_models/ReservationStatus';
@Pipe({
    name: 'statusFilter',
    pure: false
})
export class StatusFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {
console.log(items);

const status = new Map<number, string>();
status[0]="Status: Rezerwacja odrzucona"
status[1]="Status: Rezerwacja potwierdzona",
status[2]="Status: Czeka na potwierdzenie"

        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out

        console.log(items.filter(x => x.startDate.includes(filter)));
        return items.filter(item => (
                        item.officeName.includes(filter) 
                        || item.officeName.toLowerCase().includes(filter) 
                        || item.roomName.toLowerCase().includes(filter) 
                        || item.roomName.includes(filter) 
                        || new Date(item.startDate).toLocaleString("en-US").includes(filter.toString()) 
                        || new Date(item.endDate).toLocaleString("en-US").includes(filter.toString())  
                        || item.userName.includes(filter) 
                        || item.userName.toLowerCase().includes(filter) 
                        || status[item.status].includes(filter)
                        || status[item.status].toLowerCase().includes(filter)
                        ));

                        
    }
}