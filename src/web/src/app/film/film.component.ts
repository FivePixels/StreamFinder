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
    urls = [
        { name: 'netflix', url: 'https://www.netflix.com/' },
        { name: 'amazonprimevideo', url: 'https://www.primevideo.com/' },
        { name: 'appletv', url: 'https://www.apple.com/tv/' },
        { name: 'boomerang', url: 'https://www.boomerang.com/' },
        { name: 'cinemax', url: 'https://www.cinemax.com/' },
        { name: 'discoveryplus', url: 'https://www.discoveryplus.com/' },
        { name: 'disneyplus', url: 'https://www.disneyplus.com/' },
        { name: 'epixnow', url: 'https://www.epixnow.com/' },
        { name: 'fubotv', url: 'https://www.fubo.tv/' },
        {
            name: 'googleplaymovies&tv',
            url: 'https://play.google.com/store/movies',
        },
        { name: 'hbomax', url: 'https://www.hbomax.com/' },
        { name: 'hulu', url: 'https://www.hulu.com/' },
        { name: 'itunes', url: 'https://www.apple.com/itunes/' },
        {
            name: 'lifetimemovieclub',
            url: 'https://www.lifetimemovieclub.com/',
        },
        { name: 'pantaya', url: 'https://www.pantaya.com/en/' },
        { name: 'paramount', url: 'https://www.paramount.com/' },
        { name: 'peacock', url: 'https://www.peacocktv.com/' },
        { name: 'philo', url: 'https://www.philo.com/' },
        { name: 'showtime', url: 'http://www.showtime.com/' },
        { name: 'showtimeanytime', url: 'http://www.showtimeanytime.com/' },
        { name: 'slingtv', url: 'https://www.sling.com/' },
        { name: 'starz', url: 'https://www.starz.com/us/en/' },
        { name: 'univision', url: 'https://www.univision.com/' },
        { name: 'viki', url: 'https://www.viki.com/' },
        { name: 'youtube', url: 'https://www.youtube.com/' },
        { name: 'youtubetv', url: 'https://tv.youtube.com/' },
    ];
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

    getLink(i: number) {
        let a = (this.providers[i] as string).toLowerCase().replace(/ /g, '');
        let search = this.urls.find((x) => x.name == a);
        if (search == undefined || search == null) {
            return '';
        } else {
            return search.url;
        }
    }
}
