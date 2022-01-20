import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PokeModel } from '@shared/pokemodel.model';
import { PokeserviceService } from '@shared/pokeservice.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.css'],
})
export class PokecardComponent implements OnInit {
  @Input() pokecard: { name: string; url: string } = { name: '', url: '' };
  activeCard = new PokeModel('', [], 0, '', '');

  types: string[] = [];
  cardColor: { [index: PropertyKey]: any } = {};

  currentPokemonSubject = new Subject<PokeModel>();
  activePokemonSub: Subscription;

  constructor(
    private pokeservice: PokeserviceService,
    private http: HttpClient
  ) {
    this.activePokemonSub = this.currentPokemonSubject.subscribe((pokemon) => {
      this.activeCard = pokemon;
      this.types = this.pokeservice.getTypes(pokemon.types);
      this.cardColor = this.pokeservice.generateGradient(pokemon.types);
    });
  }

  ngOnInit(): void {
    this.fetchPokemon(this.pokecard.url);
  }

  ngOnDestroy(): void {
    this.activePokemonSub.unsubscribe();
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
      this.currentPokemonSubject.next(pokemon);
    });
  }
}
