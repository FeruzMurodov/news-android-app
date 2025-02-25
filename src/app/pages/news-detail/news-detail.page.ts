import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
  standalone: false,
})
export class NewsDetailPage implements OnInit {
  news: any;
  isFav: boolean = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.news = history.state.news;
    if (this.news) {
      this.isFav = this.favoritesService.isFavorite(this.news);
    }
  }

  toggleFavorite() {
    if (this.isFav) {
      this.favoritesService.removeFromFavorites(this.news);
    } else {
      this.favoritesService.addToFavorites(this.news);
    }
    this.isFav = !this.isFav;
  }
}
