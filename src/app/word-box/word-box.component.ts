import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `
        <div class="wordBox" id={{cssID}}
        [class.selected]="selected"
        [class.inserted]="inserted">
            <span *ngIf="!inserted"><</span>
            <span>{{word}}</span>
            <span *ngIf="!inserted">></span>
        </div>
    `,
  selector: 'word-box',
  styleUrls: ['./word-box.component.scss']
})
export class WordBoxComponent implements OnInit {

    @Input() word: string
    @Input() cssID: string;
    @Input() selected: boolean;
    @Input() inserted: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
