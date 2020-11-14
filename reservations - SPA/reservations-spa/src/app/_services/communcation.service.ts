import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommunicationService{
    roomsClicked = new Subject<boolean>();
}
