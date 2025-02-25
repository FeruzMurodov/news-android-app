import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  addToFavorites(news: any) {
    if (!this.favorites.find((item) => item.title === news.title)) {
      this.favorites.push(news);
      this.saveFavorites();
    }
  }

  removeFromFavorites(news: any) {
    this.favorites = this.favorites.filter((item) => item.title !== news.title);
    this.saveFavorites();
  }

  isFavorite(news: any): boolean {
    return this.favorites.some((item) => item.title === news.title);
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
