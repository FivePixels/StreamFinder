import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ScrapeService {
    apiURL = 'http://localhost:5000/api/';

    constructor(private service: HttpClient) {}

    performCheck(id, query, type) {
        return this.service.get(this.apiURL + 'performCheck', {
            params: { id: id, query: query, type: type },
        });
    }
}
