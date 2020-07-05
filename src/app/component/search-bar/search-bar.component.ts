import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() placeholder:string="";
  @Output() onInputChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onTyping(event){
    this.onInputChange.emit(event)
  }

}
