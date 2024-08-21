import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`);
  }

  getSpecies(url: any): Observable<any> {
    console.log("====",url)
    return this.http.get(url);
  }

  getMovies(urls: string[]): Observable<any[]> {
    return forkJoin(urls.map(url => this.http.get(url)));
  }

  getSpaceships(urls: string[]): Observable<any[]> {
    return forkJoin(urls.map(url => this.http.get(url)));
  }
  getFilmData(urls: string[]): Observable<any[]> {
    console.log("urls",urls)
    if(urls.length){
      const requests = urls.map(url => this.http.get(url));
      return forkJoin(requests);
    }else{
      return of([]);
    }
  }
}
