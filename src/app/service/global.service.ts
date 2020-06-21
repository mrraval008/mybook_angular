import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';


export const darkTheme = 
{ 
    '--first-color':'#18191a',
    '--second-color': '#232225',
    '--header-hover-color':' #4d494eb3',
    '--third-color':'#373538fa',
    '--fourth-color':'#787679d6',
    '--input-background-color':'#8A8D91',
    '--text-color': 'rgb(176, 179, 184)',
    '--title-color':'#ecf0f1',
    '--input-text-color':'#ecf0f1',
    '--popover-background':'rgba(217, 221, 217, 1)',
    '--blue-color':'rgb(32, 120, 244)'
}

export const lightTheme = 
{ 
    '--first-color':'#f0f2f5',
    '--second-color': '#ffffff',
    '--header-hover-color':'#c6bec7b3',
    '--third-color':'#ced0d4',
    '--fourth-color':'#787679d6',
    '--input-background-color':'#8A8D91',
    '--text-color': '#1f2021',
    '--title-color':'#0e0e0e',
    '--input-text-color':'#1f2123',
    '--popover-background':'rgba(217, 221, 217, 1)',
    '--blue-color':'rgb(32, 120, 244)'
}

@Injectable({
  providedIn: 'root'
})



export class GlobalService {

  constructor() {
    this.setDarkTheme()
   }

  onThemeChanged(event){
    if(event.target && event.target.name == "themeChange"){
      if(event.target.checked){
        this.setDarkTheme()
      }else{
        this.setLightTheme()
      }
    }
  }


  setDarkTheme(){
    this.setTheme(darkTheme)
  }

  setLightTheme(){
    this.setTheme(lightTheme)
  }
  setTheme(themeData){
    Object.keys(themeData).forEach(elem=>{
      document.documentElement.style.setProperty(elem,themeData[elem]);
    })
  }

}
