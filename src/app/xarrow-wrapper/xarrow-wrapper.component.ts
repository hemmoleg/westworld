import { Component, Input, OnChanges, AfterViewInit } from "@angular/core";

import * as React from "react";
import * as ReactDOM from "react-dom";
import Xarrow from "react-xarrows/lib";
import { AnimControllerService } from "../anim-controller.service";
import { RootIDService } from "../root-id.service";
//import Xarrow from 'react-xarrows';

@Component({
    template: `
        <div [id]="rootID" class="arrow" [style.left.px]="leftPx"></div>
    `,
    selector: "xarrow-wrapper",
    styleUrls: ["./xarrow-wrapper.component.scss"],
})
export class XarrowWrapperComponent implements OnChanges, AfterViewInit {
    @Input() start: string;
    @Input() end: string;
    leftPx: number = 0;

    public rootID: string;
    private hasViewLoaded = false;

    constructor(
        private serviceRootID: RootIDService,
        private animController: AnimControllerService
    ) {
        this.rootID = serviceRootID.getRootID();
        animController.addArrow(this);
    }

    public ngOnChanges() {
        this.renderComponent();
    }

    public ngAfterViewInit() {
        this.hasViewLoaded = true;
        this.renderComponent();

        console.log("start", this.start, "end", this.end);
    }

    private renderComponent() {
        if (!this.hasViewLoaded) {
            return;
        }

        ReactDOM.render(
            React.createElement(Xarrow, {
                start: this.start,
                end: this.end,
                //color: "#5c7384",
                startAnchor: "right",
                endAnchor: "left",
                strokeWidth: 2,
            }),
            document.getElementById(this.rootID)
        );
    }
}
