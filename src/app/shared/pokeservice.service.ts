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
  pokemonList = [];

  updateList = new Subject<[]>();

  constructor(private http: HttpClient) {}

  fetchList() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon/')
      .subscribe((response: any) => {
        // this.pokemonList = response.
        this.updateList.next(response.results);
      });
  }

  fetchPokemon(pokeurl: string) {
    this.http.get(pokeurl).subscribe((pokeObject: any) => {
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
    });
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
    if (types.length === 1) {
      return { background: color1 };
    }

    let returnGradient: { [index: PropertyKey]: any } | null = {
      background: `linear-gradient(135deg, ${color1} 25%, ${color2} 75%)`,
    };
    return returnGradient;
  }
}
