import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';
import { NetworkService } from 'src/app/services/network.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: false,
})
export class NewsPage implements OnInit {
  newsList: any[] = [];
  isOnline: boolean = true;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private networkService: NetworkService,
    private cacheService: CacheService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((status) => {
      this.isOnline = status;

      if (this.isOnline) {
        this.loadNewsFromApi();
      } else {
        this.loadNewsFromCache();
      }
    });
  }

  async loadNewsFromApi() {
    try {
      const response = await firstValueFrom(this.newsService.getNews());
      this.newsList = response.articles;
      await this.cacheService.saveNews(this.newsList);
    } catch (error) {
      console.error('Loading news failed: ', error);
    }
  }

  async loadNewsFromCache() {
    this.newsList = await this.cacheService.getCachedNews();
  }

  openNewsDetail(news: any) {
    this.router.navigate(['/news-detail'], { state: { news } });
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/news') {
        App.exitApp();
      }
    });
  }

  refreshNews(event: any) {
    setTimeout(() => {
      this.networkService.getNetworkStatus().subscribe((status) => {
        this.isOnline = status;

        if (this.isOnline) {
          this.loadNewsFromApi();
        } else {
          this.loadNewsFromCache();
        }
      });
      event.target.complete();
    }, 1000);
  }
}
