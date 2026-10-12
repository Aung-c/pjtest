import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { Login } from './login/login';
import { PaginationComponent } from './pagination/pagination';
import { NomineeComponent } from './nominee/nominee';
import { CombineComponent } from './combine/combine';
import { listComponent } from './list/list';
import { DetailComponent } from './detail/detail';
import { Cashlist } from './cashlist/cashlist';
import { Cashdetail } from './cashdetail/cashdetail';
import { AgentListComponent } from './agentlist/agentlist';
import { AgentDetailComponent } from './agentdetail/agentdetail';
import { AgentCreateComponent } from './agent-create/agent-create';

import { Loginalpha } from './logina-alpha/login-alpha';
import { ListA } from './listalpha/list-a';
import { DetailA } from './detailalpha/detail-a';

import { AdminListComponent } from './Admin/adminlist/admin';
import { CreateComponent } from './Admin/create/create';
import { loginbelta } from './Admin/login/login-belta';
import { ModalComponent } from './Admin/mor/mor';
  import { modallogin } from './models/modallogin/modallogin';
import { ListData } from './models/listdata/modallist';

@NgModule({
  declarations: [
    modallogin,
    ListData,
    ModalComponent,
    CreateComponent,
    AdminListComponent,
    loginbelta,
    DetailA,
    App,
    ListA,
    Loginalpha,
    Login,
    PaginationComponent,
    NomineeComponent,
    CombineComponent,
    listComponent,
    DetailComponent,
    Cashlist,
    Cashdetail,
    AgentListComponent,
    AgentDetailComponent,
    AgentCreateComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [],

  bootstrap: [App]
})
export class AppModule {}