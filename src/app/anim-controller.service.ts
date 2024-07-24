import { Injectable } from "@angular/core";
import { ColCreatorService } from "./col-creator.service";
import { ArrowCreatorService } from "./arrow-creator.service";
import { WordsCollumnComponent } from "./words-collumn/words-collumn.component";
import { XarrowWrapperComponent } from "./xarrow-wrapper/xarrow-wrapper.component";

@Injectable({
    providedIn: "root",
})
export class AnimControllerService {
    collumns: Array<WordsCollumnComponent> = [];
    arrows: Array<XarrowWrapperComponent> = [];
    
    indexToInsertTo = 0;
    nextIndexToInsertTo = 0;
    
    startMovingAfterXCols = 4;
    moveDistance = 160;
    colIdToInsertTo = 0;
    movedCount = 0;
    startDeletingColsAfterMovesCount = 1;

    constructor(
        private arrowCreatorService: ArrowCreatorService,
        private colCreatorService: ColCreatorService
    ) {
        this.colCreatorService.ready.then((result) => {
            this.animate();
        });
    }

    async animate(){
      await this.delay(100);
      while(true){
          await this.moveLeft();
      }
    }

    public addCol(col: WordsCollumnComponent) {
        this.collumns.push(col);
        let offset = 0;
        if (this.movedCount != 0)
            offset = -160;//(this.collumns.length) * this.moveDistance;

        col.leftPx = (this.collumns.length - 1) * 160 + offset;
    }

    public addArrow(arrow: XarrowWrapperComponent) {
        this.arrows.push(arrow);
    }

    async moveLeft() {
        
      if(this.colIdToInsertTo == 0){
          this.indexToInsertTo = this.getRandomIntInclusive(
              1,
              this.getCollumnById(this.colIdToInsertTo).WordsInColLength
          );
          this.nextIndexToInsertTo = this.getRandomIntInclusive(
              1,
              this.getCollumnById(this.colIdToInsertTo + 1).WordsInColLength
          );
      }

      console.log("inster word to", this.colIdToInsertTo);
      this.getCollumnById(this.colIdToInsertTo).insertWord(this.indexToInsertTo);

      await this.delay(600);

      this.nextIndexToInsertTo = this.getRandomIntInclusive(
          1,
          this.getCollumnById(this.colIdToInsertTo + 1).WordsInColLength
      );

      this.arrowCreatorService.CreateArrow(
          this.nextIndexToInsertTo,
          this.colIdToInsertTo
      );

      if(this.colIdToInsertTo >= this.startMovingAfterXCols){
          await this.delay(10);

          this.collumns.forEach((col) => (col.leftPx -= this.moveDistance));
          this.arrows.forEach((arrow) => (arrow.leftPx -= this.moveDistance));

          this.movedCount++;
      }

      if (this.movedCount > this.startDeletingColsAfterMovesCount) {
          this.arrowCreatorService.DeleteFisrtArrow();
          this.colCreatorService.DeleteFisrtCol();
          this.collumns.splice(0, 1);

          this.colCreatorService.AddCol();
      } else {
          
      }
      this.colIdToInsertTo++;
      this.indexToInsertTo = this.nextIndexToInsertTo;

      //arrow fade in delay
      await this.delay(300);
    }

    getCollumnById(id: number): WordsCollumnComponent{
        return this.collumns.find(col => col.colId == id);
    }

    getRandomIntInclusive(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
