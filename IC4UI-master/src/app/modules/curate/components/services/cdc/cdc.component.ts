import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-cdc',
  templateUrl: './cdc.component.html',
  styleUrls: ['./cdc.component.scss']
})
export class CdcComponent implements OnInit {

  @Input() process :any;
  @Output() activepcs = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.activepcs.emit(this.process);
  }
}
