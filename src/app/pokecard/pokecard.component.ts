import { Component, Input, OnInit } from '@angular/core';
import { PokeModel } from '@shared/pokemodel.model';

import { pokeTypes } from '../shared/pokemon.types';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.css'],
})
export class PokecardComponent implements OnInit {
  @Input() pokecard: PokeModel = new PokeModel('', [''], 0, '', '');

  types: {} = {};

  constructor() {
    this.types = pokeTypes;
  }

  ngOnInit(): void {}
}
