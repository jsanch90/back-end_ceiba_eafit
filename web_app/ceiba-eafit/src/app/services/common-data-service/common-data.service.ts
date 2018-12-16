import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor() { }
  public logged:any;
  public sensors :any;
}
