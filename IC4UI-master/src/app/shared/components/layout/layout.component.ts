import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isToggled: boolean;

  constructor() { }

  ngOnInit() {
  }

  onToggled(isToggled : boolean){
    this.isToggled = isToggled;
    console.log(isToggled);
  }

  ngAfterViewInit() {
    document.getElementById('preloader').style['display'] = 'none';
  }

}
