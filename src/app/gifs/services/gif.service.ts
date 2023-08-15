import { Injectable } from '@angular/core';
import {HttpClient, HttpParams}from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  // Aqui se van a guardar los datos que se busquen en el input de searchComponent  
  private _tagsHistory: string[] = []
  public gifList:Gif[]=[];

  // metodo para localStorage *****************************************************
  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  // metodo para cargar la informacion del localStorage
  private loadLocalStorage():void{
  if(!localStorage.getItem('history'))return

  this._tagsHistory= JSON.parse(localStorage.getItem('history')!);

  if (this._tagsHistory.length===0)return;
  this.searchTag(this._tagsHistory[0])

  }

  // --------> Credecial de Api GifApi ************ api.giphy.com/v1/gifs/search?api_key=QYg9aRmF9YSCpRPcHafbmdpoklSDJFgG&q=valorant&limit=10
  private apiKey: string = 'QYg9aRmF9YSCpRPcHafbmdpoklSDJFgG';
  private serviceUrl:string='http://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient ) { 
    this.loadLocalStorage();
    console.log('Gifs Services ....')
  };


  // Aqui se va a mostrar el valor que queramos de la variable privada
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeTagHistory(tag: string) {
    tag = tag.toLowerCase();

    // verifica si que el tag no sea duplicado
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    // agrega el nuevo tag al inicio
    this._tagsHistory.unshift(tag);
    // hace que se muestren solo 10 elementos en el dom
    this._tagsHistory = this.tagsHistory.splice(0, 10)
    // Se llama el metodo de localStorage
    this.saveLocalStorage();
  }

  // aqui agrega el dato en el array Esta funcion se pasa a searchComponent
  searchTag(tag: string):void{
    // esto hace que si dan enter y no hay nada en el input no hace nada
    if (tag.length === 0) return;
    this.organizeTagHistory(tag)
    // ----------------->>>> Aqui estoy conectando a la Api ***********************

    // Creacion de objeto Http params
    const params=new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)
    
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe((resp)=>{
      this.gifList=resp.data
      // console.log({gif:this.gifList})
      
    })

  }
}
