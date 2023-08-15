import { Component } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/interface';

@Component({
  selector: 'gif-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent {
  constructor(private gifService:GifService){}

  
  public get gifs():Gif[]{
    return this.gifService.gifList
  }
  
}