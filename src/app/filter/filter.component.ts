import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  filterForm!: FormGroup ;
  movies = [];
  speciesList = [];
  result  = []

  constructor(private fb: FormBuilder, private homeservice: HomeServiceService) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      movie: [''],
      species: [''],
      birthYear: ['']
    });

    
    this.homeservice.getCharacters().subscribe(data => {
      console.log("getting data===",data.results)
      this.result = data.results
      this.filterChanged.emit(this.result)
    });

    this.homeservice.getMovies(['https://swapi.dev/api/people/?page=1']).subscribe((films: any) => {
      console.log(films)
      
      this.movies = films[0].results; 
    });

    this.homeservice.getCharacters().subscribe(data => {
      const speciesUrls = [...new Set(data.results.map((character : any) => character.species[0]))];
      speciesUrls.forEach(url => {
        console.log(url)
      //   this.homeservice.getSpecies(url).subscribe(species => {
      //     this.speciesList.push(species);
      //   });
      });
    });
  }

  applyFilters() {
    console.log("this.filterForm.value.birthYear--",this.filterForm.value.birthYear)
    const finalList = this.result.filter((item:any)=>item.birth_year == this.filterForm.value.birthYear)  
    console.log("finalData--",finalList)

    this.filterChanged.emit(finalList);
  }
}
