import { Pipe, PipeTransform } from '@angular/core';import { ReservationStatus } from 'src/app/_models/ReservationStatus';
@Pipe({
    name: 'deskFilter',
    pure: false
})
export class DeskFilter implements PipeTransform {
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
                        || item.deskName.toLowerCase().includes(filter) 
                        || item.deskName.includes(filter) 
                        || new Date(item.startDate).toLocaleString("en-US").includes(filter.toString()) 
                        || new Date(item.endDate).toLocaleString("en-US").includes(filter.toString())  
                        || item.userName.includes(filter) 
                        || item.userName.toLowerCase().includes(filter) 
                        || status[item.status].includes(filter)
                        || status[item.status].toLowerCase().includes(filter)
                        ));

                        
    }
}