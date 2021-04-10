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
    color: ThemePalette = 'accent';
    isLoading: boolean;
    options;
    hasItems = true;
    isEmpty = false;

    constructor(private tmdbService: MovieTVService) {}

    ngOnInit() {
        this.myControl.valueChanges
            .pipe(
                debounceTime(1000),
                tap(() => (this.isLoading = true)),
                switchMap((value) => {
                    if (value) {
                        this.isEmpty = false;
                        return this.tmdbService.search(value).pipe(
                            map((values: any) =>
                                values.results.filter(
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
                console.log(results);
                this.hasItems = true;
                if (results.length === 0) {
                    this.hasItems = false;
                    return;
                }
                this.options = results.splice(0, 5);
            });
    }
}
