import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Auditoria, Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DiccionarioService } from 'src/app/services/soporte/diccionario.service';
import { Diccionario } from 'src/app/entities/diccionario';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    auditoria!: Auditoria[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    diccionario!: Diccionario[];

    constructor(private productService: ProductService, public layoutService: LayoutService, private diccionarioService: DiccionarioService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
        this.diccionarioService.listar().subscribe(data => this.diccionario = data.data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.auditoria = [
            {
                ruc: "20450106357",
                usuario_sol: "EMISI355",
                menu: "getStatusCdr:.xml",
                proceso: "SOAP-ENV:Client.0159:El nombre del archivo XML es incorrecto",
                fecha_proceso: "2024-10-24 18:10:04"
            },
            {
                ruc: "20450417514",
                usuario_sol: "EMISI123",
                menu: "getStatusCdr:20450417514-09-T001-00000078.xml",
                proceso: "SOAP-ENV:Server.0137:El sistema no puede responder su solicitud. (Se obtuvo una respuesta nula)  ",
                fecha_proceso: "2024-10-24 18:10:01"
            },
        ]
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
