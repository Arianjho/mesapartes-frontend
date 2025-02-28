import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { DiccionarioComponent } from './diccionario/diccionario.component';
import { TicketComponent } from './tickets/ticket.component';

const routes: Routes = [
    { path: 'incidencias', component: IncidenciasComponent },
    { path: 'diccionario', component: DiccionarioComponent },
    { path: 'tickets', component: TicketComponent },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SoporteRoutingModule { }
