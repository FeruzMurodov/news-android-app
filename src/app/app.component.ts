import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private newsService: NewsService,
    private platform: Platform,
    private location: Location
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.newsService.getNews().subscribe((data) => {
      console.log('Yangiliklar', data);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        if (this.location.isCurrentPathEqualTo('/news')) {
          App.exitApp();
        } else {
          this.location.back();
        }
      });
    });
  }
}
