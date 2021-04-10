import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MovieTVService {
    baseUrl =
        'https://api.themoviedb.org/3/search/multi?api_key=1a0f418d8ae6d146e630345151a2cbfd&query=';
    constructor(private service: HttpClient) {}

    search(query: string) {
        return this.service.get(this.baseUrl + query);
    }
}
