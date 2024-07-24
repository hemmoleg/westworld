import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WordBoxComponent } from './word-box/word-box.component';
import { WordsCollumnComponent } from './words-collumn/words-collumn.component';
import { ContainerComponent } from './container/container.component';
import { XarrowWrapperComponent } from './xarrow-wrapper/xarrow-wrapper.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ContainerComponent },
    ])
  ],
  declarations: [
    AppComponent,
    WordBoxComponent,
    WordsCollumnComponent,
    ContainerComponent,
    XarrowWrapperComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }