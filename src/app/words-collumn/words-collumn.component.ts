import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { AnimControllerService } from '../anim-controller.service';
import { ArrowCreatorService } from '../arrow-creator.service';

@Component({
    template: `
        <div id="wordsCollumn" #wordsCollumn [style.left.px]="leftPx">
          <word-box *ngFor="let word of wordsInCol, let i = index"
          [cssID]="getWordCSSID(i)"
          [word]="word"
          [selected]="i == insertIndex - 1"
          [inserted]="i == insertIndex && inserted">
          </word-box>
          <!-- {{colId}} / {{insertIndex}} -->
        </div>
    `,
  selector: 'words-collumn',
  styleUrls: ['./words-collumn.component.scss']
})
export class WordsCollumnComponent implements OnInit, AfterViewInit  {

    colId: number;
    @Input() wordsInCol: string[];
    get WordsInColLength():number{
        return this.wordsInCol.length;
    }
    public leftPx: number;
    @Input() screenHeight: number;

    @ViewChild('wordsCollumn') wordsCollumn: ElementRef;
    //observer: IntersectionObserver;

    insertIndex: number;
    inserted = false;

    constructor(private arrowCreatorService: ArrowCreatorService, animController: AnimControllerService) {
        this.colId = arrowCreatorService.getColID();
        animController.addCol(this);
    }

   ngOnInit(): void {
       //this.observer = new IntersectionObserver(this.onIntersection.bind(this), {threshold: [0.5]});
   }

    ngAfterViewInit(){
        //vertically center collumn
        let offsetHeight = this.wordsCollumn.nativeElement.offsetHeight;
        this.wordsCollumn.nativeElement.style.top = (this.screenHeight - offsetHeight) / 2 + "px";

        // if(this.wordsCollumn){
        //   this.observer.observe(this.wordsCollumn.nativeElement);
        //  }
    }

    onIntersection(entries: any){
      if(entries[0].isIntersecting === false){
        console.log("el in viewpoert");
      }
     }

    insertWord(indextToInsertTo: number){
        this.insertIndex = indextToInsertTo;
        this.wordsInCol.splice(indextToInsertTo, 0, this.wordsInCol[indextToInsertTo - 1]);
        this.inserted = true;
    }

    getWordCSSID(i : number): string{
        let id = "";
        if(this.inserted && i == this.insertIndex){
            id = 'inserted' + this.colId;
        }
        else{
            id = this.colId + "_" + i;
        }
        this.arrowCreatorService.ReportID(id, this.colId);
        return id;
    }
}
