import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ArrowCreatorService {
    wordIDs: [string[]] = [[]];
    arrows = [];
    totalColCount = -1;

    constructor() {}

    public ReportID(id: string, colIndex: number) {
        if (this.wordIDs[colIndex] == undefined) this.wordIDs.push([]);

        this.wordIDs[colIndex].push(id);
    }

    public getColID():number{
        this.totalColCount++;
        return this.totalColCount;
    }

    public CreateArrow(targetIndex: number, colIndex: number) {
        if (colIndex + 1 >= this.wordIDs.length) return;

        this.arrows.push({
            start: this.findInsertedIDInWordIDs(colIndex),
            end: this.wordIDs[colIndex + 1][targetIndex - 1],
        });
    }

    private findInsertedIDInWordIDs(colIndex: number): string {
        return this.wordIDs[colIndex].find((id) => id.startsWith("inserted"));
    }

    public DeleteFisrtArrow() {
        this.arrows.splice(0, 1);
    }

    getRandomIntInclusive(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
