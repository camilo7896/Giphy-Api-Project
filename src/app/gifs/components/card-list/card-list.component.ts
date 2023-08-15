import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/interface';

@Component({
  selector: 'gif-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input()
  public gifs:Gif[]=[];

  
}
