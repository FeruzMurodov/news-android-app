import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = environment.newsApiKey;

  constructor(private http: HttpClient) {}

  getNews(query: string = 'movies'): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
