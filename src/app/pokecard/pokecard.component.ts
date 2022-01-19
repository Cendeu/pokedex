import { Component, Input, OnInit } from '@angular/core';
import { PokeModel } from '@shared/pokemodel.model';
import { PokeserviceService } from '@shared/pokeservice.service';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.css'],
})
export class PokecardComponent implements OnInit {
  @Input() pokecard: PokeModel = new PokeModel('', [''], 0, '', '');

  types: string[] = [];
  cardColor: { [index: PropertyKey]: any } = {};

  constructor(private pokeservice: PokeserviceService) {}

  ngOnInit(): void {
    this.types = this.pokeservice.getTypes(this.pokecard.types);
    this.cardColor = this.pokeservice.generateGradient(this.pokecard.types);
  }
}
