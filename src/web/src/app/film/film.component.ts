import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MovieTVService } from '../movie-tv.service';
import { AppService } from '../app.service';
import { ScrapeService } from '../scrape.service';

@Component({
    selector: 'app-film',
    templateUrl: './film.component.html',
    styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {
    providers;
    model: any;
    loading: boolean = true;
    img: string;
    type: string;
    id: string;
    prices;
    constructor(
        private route: ActivatedRoute,
        private service: MovieTVService,
        private scraper: ScrapeService
    ) {}
    ngOnInit(): void {
        this.route.paramMap.subscribe((x) => {
            this.type = x.get('type');
            this.id = x.get('id');
        });
        this.service.searchById(this.type, +this.id).subscribe((x: any) => {
            let a;
            this.model = x;
            if (this.type === 'tv') {
                a = this.model.name;
            } else {
                a = this.model.original_title;
            }
            this.scraper.performCheck(this.id, a, this.type).subscribe((x) => {
                this.providers = x[0];
                this.prices = x[1];
                this.loading = false;
            });
        });
    }

    getImage() {
        return this.model
            ? 'https://image.tmdb.org/t/p/original' + this.model.poster_path
            : '';
    }
    getPrice(i: number) {
        return this.prices[i];
    }

    getProviderImage(i: number) {
        console.log(
            (this.providers[i] as string).toLowerCase().replace(/ /g, '')
        );
        return (this.providers[i] as string).toLowerCase().replace(/ /g, '');
    }
}
