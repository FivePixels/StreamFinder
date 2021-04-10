import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { of } from 'rxjs';
import { debounceTime, finalize, map, switchMap, tap } from 'rxjs/operators';
import { MovieTVService } from '../movie-tv.service';
@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
    myControl = new FormControl();
    keyword = 'robot';
    isLoading: boolean;
    color: ThemePalette = 'accent';
    options;
    baseUrl =
        'https://api.themoviedb.org/3/search/movie?api_key=b745fd575abc6a839db385885fb2aee0&query=';
    hasItems: boolean = true;
    isEmpty: boolean = false;

    constructor(private movieservice: MovieTVService) {}

    ngOnInit(): void {
        this.myControl.valueChanges
            .pipe(
                debounceTime(1000),
                tap(() => (this.isLoading = true)),
                switchMap((value) => {
                    if (value) {
                        this.isEmpty = false;
                        return this.movieservice.search(value).pipe(
                            map((response: any) =>
                                response.results.filter(
                                    (x) => x.media_type !== 'person'
                                )
                            ),
                            finalize(() => (this.isLoading = false))
                        );
                    }
                    this.isLoading = false;
                    this.isEmpty = true;
                    return of([]);
                })
            )
            .subscribe((results: any) => {
                this.hasItems = true;
                if (results.length === 0) {
                    this.hasItems = false;
                    return;
                }
                this.options = results.splice(0, 5);
            });
    }
}
