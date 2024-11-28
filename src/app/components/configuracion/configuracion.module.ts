import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { EmpresasComponent } from './empresas/empresas.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [EmpresasComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    TableModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    ToolbarModule,
    DropdownModule
  ],
  providers: [MessageService]
})
export class ConfiguracionModule { }
