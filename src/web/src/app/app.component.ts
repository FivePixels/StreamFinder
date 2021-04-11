import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'client';
    routes: string;

    /**
     *
     *
     */
    constructor(route: Router) {
        this.routes = route.url;
    }

    ngOnInit(): void { }
}
