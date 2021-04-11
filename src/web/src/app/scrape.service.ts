import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ScrapeService {
    apiURL = 'https://streamfinder.tech/api/';

    constructor(private service: HttpClient) { }

    performCheck(id, query, type) {
        return this.service.get(this.apiURL + 'performCheck', {
            params: { id: id, query: query, type: type },
        });
    }
}
