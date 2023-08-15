import { Component ,ElementRef,ViewChild} from '@angular/core';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'search-box-componet',
  template:`
  <h5>search characters
</h5>
  <input type="text"
  class="form-control"
  placeholder="Search..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})
export class SearchBoxComponent {

 @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  
  // Aqui se importa el servicio
  constructor(private gifService:GifService){};

 

searchTag(){
  // Aqui se recoge lo que se agrega en el input
  const newTag= this.tagInput.nativeElement.value;

  // Aqui se llama la funcion del servicio
  this.gifService.searchTag(newTag);
  
  console.log({newTag})
// Aqui limpia en input despues de dar enter 
  this.tagInput.nativeElement.value='';
  
}
}
