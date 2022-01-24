import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '@shared/utilities.service';
import { PokeModel } from '../shared/pokemodel.model';
import { PokeserviceService } from '../shared/pokeservice.service';

@Component({
  selector: 'app-pokecards',
  templateUrl: './pokecards.component.html',
  styleUrls: ['./pokecards.component.css'],
})
export class PokecardsComponent implements OnInit {
  pokecards: [] = [];

  constructor(
    private pokeservice: PokeserviceService,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.pokeservice.updateList.subscribe((list) => {
      this.pokecards = this.util.chunkArray(list, 5);
    });
    this.pokeservice.fetchList();
  }
}
