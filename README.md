# StreamFinder

## Inspiration
We wanted to get rid of the grief of searching through each and every streaming service, just to find out the show/movie you are looking for _isn't there_. With [StreamFinder](https://streamfind.tech/) we aim to fix that problem.

## What it does
StreamFinder scrapes search results from Google to report to you the sites you can use to stream your favorite tv shows and movies legally. 

## How we built it
- First, we built our web-scraper in the back-end using [Puppeteer](https://pptr.dev/), a big shoutout to [Node.js](https://nodejs.org/).
- Second, we set up a basic layout for our webpage with [Angular](https://angular.io/), utilizing [The Movie Database API](https://developers.themoviedb.org/) we were able to display information about the movies and shows being searched.
- Third, we set up our [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database to save all of your favorite movies/shows along with the streaming services they are available on.
- Fourth and finally we created a custom API to retrieve movie and tv show data at the click of a mouse.

## Challenges we ran into
One challenge we came across was using _Angular_ for our front-end, as it was the first time each of us used it for a project of this scale. There are a lot of moving parts when trying to create a search engine and sometimes those parts can get out of sync, another challenge we faced was locating problems as they occurred and figuring out the best course of action to address them. Our biggest challenge by far has been connecting our front and back-end together to ensure that data gets scraped and written to our database if not found upon an initial search by the user. Luckily we understood that certain ideas needed to be pivoted in order to pull everything together.

## Accomplishments that we're proud of
As first-time _hackathoners_, we're proud to be here! We put together **a lot** over the past 48 hours and for many of us, it was our first time using some of these dependencies. Web-scraping data, writing it to a database, and reading that data all in one click is easier said than done and we're proud to say we did just that. 

## What we learned
We learned that team communication is necessary to keep everyone on the same page and also that receiving outside help can be one of the most valuable components of a good project.

## What's next for StreamFinder
There is only one direction, **up**! We will look to expand StreamFinder to query for music streaming services and reskin our website until it meets and exceeds all expectations.

## Credits
[Amar Budhathoki](https://github.com/Ab30657)

[Michael Gonzalez](https://github.com/gonzohub)

[Dylan Bolger](https://github.com/fivepixels/)

[Thad Berta](https://github.com/reals1ant)
