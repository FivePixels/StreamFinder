import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MovieTVService } from '../movie-tv.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-film',
    templateUrl: './film.component.html',
    styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {
    providers = ['Netflix'];
    model: any;
    loading: boolean = true;
    img: string;
    type: string;
    id: string;
    constructor(
        private route: ActivatedRoute,
        private service: MovieTVService,
        private appService: AppService
    ) {}
    ngOnInit(): void {
        this.route.paramMap.subscribe((x) => {
            this.type = x.get('type');
            this.id = x.get('id');
            //Start Scraping and loading the spinner

            //this.data.getUsers().subscribe((data) => {
            // this.users = data;
            //});
            ///
        });
        this.service.searchById(this.type, +this.id).subscribe((x: any) => {
            this.model = x;
            this.loading = false;
            console.log(this.model);
        });
        //
        //Get Providers List
        /*this.service
            .getProviderList(this.model.media_type, this.model.id)
            .pipe(
                map((x: any) => {
                    x.results.US.flatrate;
                })
            )
            .subscribe((x) => (this.model.watch_providers = x));
        console.log(this.model.watch_providers);*/
    }

    getImage() {
        return this.model
            ? 'https://image.tmdb.org/t/p/original' + this.model.poster_path
            : '';
    }
}
