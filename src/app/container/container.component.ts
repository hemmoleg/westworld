import {
    Component,
    HostListener
} from "@angular/core";
import { ColCreatorService } from "../col-creator.service";
import { ArrowCreatorService } from "../arrow-creator.service";
import { AnimControllerService } from "../anim-controller.service";

@Component({
    template: `
        <xarrow-wrapper
            *ngFor="let arrow of arrowCreatorService.arrows"
            [start]="arrow.start"
            [end]="arrow.end"
        ></xarrow-wrapper>

        <div id="main">
            <words-collumn
                *ngFor="let wordsInCol of colCreatorService.collumns; let i = index"
                [wordsInCol]="wordsInCol"
                [screenHeight]="screenHeight"
            >
            </words-collumn>
        </div>

        <!-- <div id="debugLine" (click)="moveLeft()"></div> -->
    `,
    selector: "app-container",
    styleUrls: ["./container.component.scss"],
})
export class ContainerComponent {
    @HostListener("window:resize", ["$event"])
    screenHeight = 0;

    constructor(
        public colCreatorService: ColCreatorService,
        public arrowCreatorService: ArrowCreatorService,
        protected animController: AnimControllerService
    ) {
        this.onResize();
    }

    onResize(event?) {
        this.screenHeight = window.innerHeight;
    }
}
