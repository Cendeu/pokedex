import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UtilitiesService } from '@shared/utilities.service';
import { PokeserviceService } from '../shared/pokeservice.service';

@Component({
  selector: 'app-pokecards',
  templateUrl: './pokecards.component.html',
  styleUrls: ['./pokecards.component.css'],
})
export class PokecardsComponent implements OnInit {
  screenWidth: number = 0;
  chunkSize: number = 0;
  pokecards: [] = [];
  unformattedPokecards: [] = [];

  constructor(
    private pokeservice: PokeserviceService,
    private util: UtilitiesService
  ) {}

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    this.chunkSize = Math.floor((this.screenWidth * 0.8) / 240);
    this.pokecards = this.util.chunkArray(
      this.unformattedPokecards,
      this.chunkSize
    );
  }

  ngOnInit(): void {
    this.getScreenSize();
    this.pokeservice.updateList.subscribe((list) => {
      this.unformattedPokecards = list;
      this.pokecards = this.util.chunkArray(
        this.unformattedPokecards,
        this.chunkSize
      );
    });
    this.pokeservice.fetchList();
  }
}
