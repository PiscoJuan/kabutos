import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamsService {

  navData:any;
  constructor() { }

  setNavData(navObj){
    this.navData=navObj;
    console.log(this.navData)
  }

  getNavData(){
    if(this.navData == null || this.navData == undefined)
      return 0;
    console.log(this.navData)
    return this.navData;
  }
}
