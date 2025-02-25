import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage {
  favorites: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(news: any) {
    this.favoritesService.removeFromFavorites(news);
    this.ionViewWillEnter;
  }

  openNewsDetail(news: any) {
    this.router.navigate(['/news-detail'], { state: { news } });
  }
}
