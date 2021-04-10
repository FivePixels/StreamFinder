import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    observer = new Subject();

    public subsriber$ = this.observer.asObservable();

    emitData(data) {
        this.observer.next(data);
    }
    constructor() {}
}
