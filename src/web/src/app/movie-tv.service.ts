import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MovieTVService {
    baseUrlSearch =
        'https://api.themoviedb.org/3/search/multi?api_key=1a0f418d8ae6d146e630345151a2cbfd&query=';
    constructor(private service: HttpClient) {}

    search(query: string) {
        return this.service.get(this.baseUrlSearch + query);
    }

    searchById(type: string, id: number) {
        if (type === 'tv') {
            return this.service.get(
                'https://api.themoviedb.org/3/tv/' +
                    id +
                    '?api_key=1a0f418d8ae6d146e630345151a2cbfd'
            );
        } else {
            return this.service.get(
                'https://api.themoviedb.org/3/movie/' +
                    id +
                    '?api_key=1a0f418d8ae6d146e630345151a2cbfd'
            );
        }
    }

    getProviderList(type: string, id: number) {
        if (type === 'tv') {
            return this.service.get(
                'https://api.themoviedb.org/3/tv/' +
                    id +
                    '/watch/providers?api_key=1a0f418d8ae6d146e630345151a2cbfd'
            );
        } else {
            return this.service.get(
                'https://api.themoviedb.org/3/movie/' +
                    id +
                    '/watch/providers?api_key=1a0f418d8ae6d146e630345151a2cbfd'
            );
        }
    }
}
