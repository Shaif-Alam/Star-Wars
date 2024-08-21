import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeServiceService } from '../home-service.service';
import { BehaviorSubject, forkJoin, map } from 'rxjs';

interface custome {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;

  // other properties
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  characterId: string | null = null;
  characterDetails = new BehaviorSubject<any>({});
  detils : any = {}
  films: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private homeserv: HomeServiceService,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.characterId = params['name'];
      this.homeserv.getCharacters().subscribe(
        data => {
          if (data && data.results) {
            const list = data.results.filter((item: any) => item.name === this.characterId)[0];
            console.log("list",list)
            let films = this.homeserv.getFilmData(list.films)
            let vehicles = this.homeserv.getFilmData(list.vehicles)
            let starships = this.homeserv.getFilmData(list.starships)

            forkJoin([films,vehicles,starships]).subscribe({
              next: (res) => {
                console.log("res",res)
                list.films = res[0]
                list.vehicles = res[1]
                list.vehicles = res[2]
                this.characterDetails.next(list)
              }
            })
            this.characterDetails.subscribe(data=>{
              console.log("this is all data=",data)
              this.detils = data
              console.log(" ---- ",this.detils)
            })
          } else {
            console.warn('No results found in data:', data);
          }
        },
        error => {
          console.error('Error fetching characters:', error);
        }
      );
    });
  }
}
