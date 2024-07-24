import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ColCreatorService {
    //wordsInCol = ["しい記","TEST","TEST","TEST","TEST","TEST","TEST","TEST","TEST","TEST","TEST","TEST", "TEST"];
    ready: Promise<boolean>;
    
    wordsInCol = [];
    collumns = [];
    cols = 11;
    maxWordsInCol = 8;

    constructor() {
        this.createWords(20);

        this.ready = this.setupCols();
    }

    async setupCols(): Promise<boolean>{
        while (this.collumns.length < this.cols) {
            this.AddCol();
        }
        return true;
    }

    createWords(amountWords: number) {
        let letters = ["A", "T", "C", "G"];
        let wordLength = 4;
        let result = [];
        for (let i = 0; i < amountWords; i++) {
            result = [];
            for (let j = 0; j < wordLength; j++) {
                result.push(
                    letters[Math.floor(Math.random() * letters.length)]
                );
            }
            this.wordsInCol.push(result.join(""));
        }
    }

    public AddCol(){
        let wordsArray = new Array();
        let totalWords = this.getRandomIntInclusive(5, this.maxWordsInCol);
        while (wordsArray.length < totalWords) {
            wordsArray.push(
                this.wordsInCol[Math.floor(Math.random() * this.wordsInCol.length)]
            );
        }
        this.collumns.push(wordsArray);
    }

    public DeleteFisrtCol() {
      this.collumns.splice(0, 1);
    }

    getRandomIntInclusive(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
