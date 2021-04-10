import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnInit {
    @Input() model: any;
    isRated: boolean;

    constructor() {}

    ngOnInit(): void {}

    getImage() {
        return 'https://image.tmdb.org/t/p/original' + this.model.poster_path;
    }

    getYear() {
        if (this.model.media_type === 'tv') {
            if (this.model.first_air_date) {
                return this.model.first_air_date.substring(0, 4);
            }
        }
        if (this.model.media_type === 'movie') {
            if (this.model.release_date) {
                return this.model.release_date.substring(0, 4);
            }
        }
        return 'Not Dated';
    }
    getTitle() {
        if (this.model.media_type === 'movie') {
            return this.model.original_title;
        }
        if (this.model.media_type === 'tv') {
            return this.model.original_name;
        }
    }
    getRating() {
        if (this.model.vote_average === 0) {
            this.isRated = false;
            return 'Unrated';
        }
        this.isRated = true;
        return this.model.vote_average;
    }
}
