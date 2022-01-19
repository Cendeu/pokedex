import { Injectable } from '@angular/core';
import { PokeModel } from '@shared/pokemodel.model';

import { pokeTypes } from './pokemon.types';
import { typeColors } from './pokemon.types';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeserviceService {
  pokemonList: PokeModel[] = [
    new PokeModel(
      'Bulbasaur',
      ['grass', 'poison'],
      1,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
      ''
    ),
    new PokeModel(
      'Ivysaur',
      ['grass', 'poison'],
      2,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png',
      ''
    ),
  ];

  updateList = new Subject<PokeModel[]>();

  constructor(private http: HttpClient) {}

  fetchList() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon/')
      .subscribe((response) => {
        this.fetchPokemon(response);
      });
    console.log(this.pokemonList);
    this.updateList.next(this.pokemonList.slice());
  }

  fetchPokemon(pokenames: any) {
    pokenames.results.forEach((id: any) => {
      this.http
        .get(`https://pokeapi.co/api/v2/pokemon/${id.name}`)
        .subscribe((response) => {
          this.savePokemon(response);
        });
    });
  }

  savePokemon(pokeObject: any) {
    let pokemon = new PokeModel(
      pokeObject.name,
      [pokeObject.types[0].type.name],
      pokeObject.id,
      pokeObject.sprites.front_default,
      pokeObject.sprites.back_default
    );
    if (pokeObject.types.length > 1) {
      pokemon.types.push(pokeObject.types[1].type.name);
    }
    this.pokemonList.push(pokemon);
  }

  getList() {
    let newList: PokeModel[] = this.pokemonList.slice();
    return newList;
  }

  getTypes(types: string[]) {
    let typeLinks: string[] = [];

    types.forEach((typeKey: string) => {
      typeLinks.push(pokeTypes[typeKey]);
    });
    return typeLinks;
  }

  generateGradient(types: string[]) {
    let color1 = typeColors[types[0]];
    let color2 = typeColors[types[1]];

    let returnGradient: { [index: PropertyKey]: any } | null = {
      background: `linear-gradient(135deg, ${color1} 25%, ${color2} 75%)`,
    };
    return returnGradient;
  }
}
