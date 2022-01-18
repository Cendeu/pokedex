import { Injectable } from '@angular/core';
import { PokeModel } from '@shared/pokemodel.model';

import { pokeTypes } from './pokemon.types';

@Injectable({
  providedIn: 'root',
})
export class PokeserviceService {
  pokemonList: PokeModel[] = [
    new PokeModel(
      'Bulbasaur',
      ['grass', 'poison'],
      1,
      'For some time after its birth, it grows by gaining nourishment from the seed on its back.',
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
    ),
    new PokeModel(
      'Ivysaur',
      ['grass', 'poison'],
      2,
      "When the bud on its back starts swelling, a sweet aroma wafts to indicate the flower's coming bloom.",
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png'
    ),
  ];

  constructor() {}

  getList() {
    let newList: PokeModel[] = this.pokemonList.slice();
    return newList;
  }

  getTypes(types: string[]) {
    let typeLinks: string[] = [];

    types.forEach((typeKey: string) => {
      typeLinks.push(pokeTypes[typeKey]);
    });
  }
}
