import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GeneratorComponent } from './generator/generator.component';
import { ColorChromeModule } from 'ngx-color/chrome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ColorChromeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
