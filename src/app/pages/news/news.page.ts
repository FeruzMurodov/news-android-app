import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: false,
})
export class NewsPage implements OnInit {
  newsList: any[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit() {
    this.newsService.getNews().subscribe((data) => {
      this.newsList = data.articles;
    });
  }

  openNewsDetail(news: any) {
    this.router.navigate(['/news-detail'], { state: { news } });
  }
}
