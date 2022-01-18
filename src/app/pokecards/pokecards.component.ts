import { Component, OnInit } from '@angular/core';
import { PokeModel } from '../shared/pokemodel.model';
import { PokeserviceService } from '../shared/pokeservice.service';

@Component({
  selector: 'app-pokecards',
  templateUrl: './pokecards.component.html',
  styleUrls: ['./pokecards.component.css'],
})
export class PokecardsComponent implements OnInit {
  pokecards: PokeModel[] = [];

  constructor(private pokeservice: PokeserviceService) {}

  ngOnInit(): void {
    this.pokecards = this.pokeservice.getList();
  }
}
