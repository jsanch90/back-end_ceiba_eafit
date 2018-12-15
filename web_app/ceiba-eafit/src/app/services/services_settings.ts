import { Injectable } from '@angular/core';

const CONFIG ={
  apiUrl:'http://localhost:8080/'
};

@Injectable()
export class ServicesSettings {

  constructor() {}
  
    public getApiUrl(){
      return CONFIG.apiUrl;
    }

}