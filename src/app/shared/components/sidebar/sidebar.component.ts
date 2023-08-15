import { Component } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private gifService:GifService){}

  
  get tags(){
  
    return [...this.gifService.tagsHistory]
  }

  searchTag(tag:string){

   this.gifService.searchTag(tag)
  }
  


}
