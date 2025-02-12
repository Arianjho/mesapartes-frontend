import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DiccionarioService } from 'src/app/services/soporte/diccionario.service';
import { Diccionario } from 'src/app/entities/diccionario';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { Auditoria } from 'src/app/entities/auditoria';
import { IncidenciasService } from 'src/app/services/soporte/incidencias.service';
import { Dashboard } from 'src/app/entities/dashboard';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    auditoria!: Auditoria[];

    dashboard!: Dashboard;

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    diccionario!: Diccionario[];

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private diccionarioService: DiccionarioService,
        private auditoriaService: AuditoriaService,
        private incidenciaService: IncidenciasService
    ) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
        this.diccionarioService.listar().subscribe(data => this.diccionario = data.data);
        this.auditoriaService.listar().subscribe(data => this.auditoria = data.data);
        this.incidenciaService.listarDashboard().subscribe(data => this.dashboard = data.data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
