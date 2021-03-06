import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemonFilterPipe } from './Pipes/demon-filter.pipe';
import { MinionFilterPipe } from './Pipes/minion-filter.pipe';
import { OutsiderFilterPipe } from './Pipes/outsider-filter.pipe';
import { TownspersonFilterPipe } from './Pipes/townsperson-filter.pipe';
import { PlayerListComponent } from './Components/player-list/player-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NightOrderComponent } from './Components/night-order/night-order.component';
import { FirstNightPipe } from './Pipes/first-night.pipe';
import { OtherNightsPipe } from './Pipes/other-nights.pipe';
import { StatusPanelComponent } from './Components/status-panel/status-panel.component';
import { StatusToColorPipe } from './Pipes/status-to-color.pipe';
import { NotesPanelComponent } from './Components/notes-panel/notes-panel.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SetupPageComponent } from './Components/setup-page/setup-page.component';
import {MatSelectModule} from '@angular/material/select';
import { RoleMatchPipe } from './Pipes/role-match.pipe';
import {MatInputModule} from '@angular/material/input';
import { MergeStringsPipe } from './Pipes/merge-strings.pipe';




@NgModule({
  declarations: [
    AppComponent,
    DemonFilterPipe,
    MinionFilterPipe,
    OutsiderFilterPipe,
    TownspersonFilterPipe,
    PlayerListComponent,
    NightOrderComponent,
    FirstNightPipe,
    OtherNightsPipe,
    StatusPanelComponent,
    StatusToColorPipe,
    NotesPanelComponent,
    SetupPageComponent,
    RoleMatchPipe,
    MergeStringsPipe,
  ],
  imports: [
    BrowserModule,
    MdbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
