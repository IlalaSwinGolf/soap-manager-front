import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category/category.service'
import { DateFormatPipe } from './pipes/date.pipe'

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    FormsModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
