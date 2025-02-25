import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private CACHE_KEY = 'cached_news';

  constructor() {}

  async saveNews(news: any[]): Promise<void> {
    await Preferences.set({
      key: this.CACHE_KEY,
      value: JSON.stringify(news),
    });
  }

  async getCachedNews(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.CACHE_KEY });
    return value ? JSON.parse(value) : [];
  }
}
