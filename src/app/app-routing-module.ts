import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombineComponent } from './combine/combine';
import { Login } from './login/login';
import { PaginationComponent } from './pagination/pagination';
import { NomineeComponent } from './nominee/nominee';
import { DetailComponent } from './detail/detail';
import { listComponent } from './list/list';
import { Cashlist } from './cashlist/cashlist';
import { Cashdetail } from './cashdetail/cashdetail';
import { AgentDetailComponent } from './agentdetail/agentdetail';
import { AgentListComponent } from './agentlist/agentlist';
import { AgentCreateComponent } from './agent-create/agent-create';
import { Loginalpha } from './logina-alpha/login-alpha';
import { ListA } from './listalpha/list-a';
import { DetailA } from './detailalpha/detail-a';
import { AdminListComponent } from './Admin/adminlist/admin';
import { CreateComponent } from './Admin/create/create';
import  { loginbelta } from './Admin/login/login-belta';
import { ModalComponent } from './Admin/mor/mor';
import { modallogin } from './models/modallogin/modallogin';
import { ListData } from './models/listdata/modallist';

const routes: Routes = [
  { path: '', redirectTo: 'modallogin', pathMatch: 'full' },

  { path: 'modallist', component: ListData},
  {path: 'modallogin', component: modallogin},
  {path: 'mor', component: ModalComponent},
  { path: 'loginbelta' , component:loginbelta},
  {path: 'admin', component:AdminListComponent},
  {path: 'create', component :CreateComponent  },
  {path: 'detaila', component:DetailA },
  { path: 'Lista',component:ListA },
  { path: 'logina' , component:Loginalpha},
  { path: 'login', component: Login },
  { path: 'agentlist', component: AgentListComponent },
  { path: 'agentdetail', component: AgentDetailComponent },
  { path: 'agentcreate', component: AgentCreateComponent },

  { path: 'list', component: listComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'cashlist', component: Cashlist },
  { path: 'cashdetail', component: Cashdetail },
  { path: 'pagination', component: PaginationComponent },
  { path: 'combine', component: CombineComponent },
  { path: 'nominee', component: NomineeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}