import { Component } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  characters:any[] = [];
  filteredCharacters:any = [];

  constructor(private homeservice:HomeServiceService,
    public router : Router
  ) {}

  ngOnInit() {
    // this.homeservice.getCharacters().subscribe(data => {
    //   this.characters = data.results;
    //   this.filteredCharacters = [...this.characters]; 
      
    // });
  }

  onFilterChanged(filters: any) {
    this.filteredCharacters = this.characters.filter((character: { films: string | any[]; species: string | any[]; birth_year: string; }) => {
      let matchesMovie = true;
      let matchesSpecies = true;
      let matchesBirthYear = true;

      if (filters.movie) {
        matchesMovie = character.films.includes(filters.movie);
      }

      if (filters.species) {
        matchesSpecies = character.species.includes(filters.species);
      }

      if (filters.birthYearStart || filters.birthYearEnd) {
        const birthYear = parseFloat(character.birth_year.replace('BBY', '').replace('ABY', ''));
        if (filters.birthYearStart) {
          matchesBirthYear = birthYear >= filters.birthYearStart;
        }
        if (filters.birthYearEnd) {
          matchesBirthYear = matchesBirthYear && birthYear <= filters.birthYearEnd;
        }
      }

      return matchesMovie && matchesSpecies && matchesBirthYear;
    });
  }
  navigate(name : any){
    console.log("------",name)
    this.router.navigate(['/character'],{
      queryParams : {name : name}
    })
  }

  getList(data:any){
    console.log("xxxxxx---",data)
    this.characters = data;
    this.filteredCharacters = [...this.characters]; 
    
  }
}
