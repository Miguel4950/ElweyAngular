import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ComidaTableComponent } from './components/comida-table/comida-table.component';
import { Comida } from '../../models/comida.model';
import { Categoria } from '../../models/categoria.model';
import { Adicional } from '../../models/adicional.model';
import { Domiciliario } from '../../models/domiciliario.model';
import { Operador } from '../../models/operador.model';
import { Administrador } from '../../models/administrador.model';
import { ComidaService } from '../../service/comida.service';
import { AdicionalService } from '../../service/adicional.service';
import { DomiciliarioService } from '../../service/domiciliario.service';
import { OperadorService } from '../../service/operador.service';
import { AdministradorService } from '../../service/administrador.service';
import { Router, RouterLink } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-comida-table-page',
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
    PageTitleComponent,
    ComidaTableComponent,
    RouterLink,
  ],
  templateUrl: './comida-table-page.component.html',
  styleUrl: './comida-table-page.component.css',
})
export class ComidaTablePageComponent implements OnInit {
  // DI
  private comidaService = inject(ComidaService);
  private adicionalService = inject(AdicionalService);
  private domiciliarioService = inject(DomiciliarioService);
  private operadorService = inject(OperadorService);
  private administradorService = inject(AdministradorService);
  private router = inject(Router);

  title: string = 'Gestión de Comidas';
  comidaArray: Comida[] = [];
  categorias: Categoria[] = [];
  adicionales: Adicional[] = [];
  domiciliarios: Domiciliario[] = [];
  operadores: Operador[] = [];
  administradores: Administrador[] = [];

  esVistaTarjetas: boolean = false;
  tabActiva: 'COMIDAS' | 'ADICIONALES' | 'CATEGORIAS' | 'DOMICILIARIOS' | 'OPERADORES' | 'ADMINISTRADORES' = 'COMIDAS';
  filtroCategoria: string = '';
  busqueda: string = '';
  mensajeAlerta: string = '';

  editAdicionalId: number | null = null;
  adicionalForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl(3000, [Validators.required, Validators.min(0)]),
    disponible: new FormControl(true, [Validators.required]),
    categoriaId: new FormControl(1, [Validators.required]),
  });

  editCategoriaId: number | null = null;
  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });

  editDomiciliarioId: number | null = null;
  domiciliarioForm = new FormGroup({
    cedula: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    disponible: new FormControl(true, [Validators.required]),
  });

  editOperadorId: number | null = null;
  operadorForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });

  editAdminId: number | null = null;
  adminForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    // 1. Cargar datos iniciales desde el backend Spring Boot
    this.cargarTodosLosCatalogos();
    this.detectarVista();
  }

  cargarTodosLosCatalogos(): void {
    this.comidaService.findAll().subscribe((data) => (this.comidaArray = data));
    this.comidaService.getCategorias().subscribe((data) => (this.categorias = data));
    this.adicionalService.findAll().subscribe((data) => (this.adicionales = data));
    this.domiciliarioService.findAll().subscribe((data) => (this.domiciliarios = data));
    this.operadorService.findAll().subscribe((data) => (this.operadores = data));
    this.administradorService.findAll().subscribe((data) => (this.administradores = data));
  }

  detectarVista(): void {
    this.esVistaTarjetas = this.router.url.includes('tarjetas');
  }

  cambiarTab(tab: 'COMIDAS' | 'ADICIONALES' | 'CATEGORIAS' | 'DOMICILIARIOS' | 'OPERADORES' | 'ADMINISTRADORES'): void {
    this.tabActiva = tab;
    this.mensajeAlerta = '';
  }

  seleccionarCategoria(cat: string): void {
    this.filtroCategoria = cat;
  }

  onBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.busqueda = input.value;
  }

  get comidasFiltradas(): Comida[] {
    return this.comidaArray.filter((item) => {
      const matchCat =
        !this.filtroCategoria ||
        (item.categoria &&
          item.categoria.nombre.toLowerCase() ===
            this.filtroCategoria.toLowerCase());
      const matchText =
        !this.busqueda ||
        item.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        (item.descripcion &&
          item.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()));
      return matchCat && matchText;
    });
  }

  eliminarComida(comida: Comida): void {
    // 1. Invocar DELETE /comidas/delete/{id} y actualizar la tabla local
    this.comidaService.deleteById(comida.id).subscribe({
      next: () => {
        this.comidaArray = this.comidaArray.filter((c) => c.id !== comida.id);
        this.mensajeAlerta = '';
      },
      error: (err) => {
        this.mensajeAlerta =
          err?.error?.mensaje ||
          'No se puede eliminar este plato porque está asociado a pedidos activos.';
      },
    });
  }

  // 1. CRUD de Adicionales
  guardarAdicional(): void {
    if (this.adicionalForm.invalid) return;
    const val = this.adicionalForm.value;
    const payload: Adicional = {
      id: this.editAdicionalId ?? 0,
      nombre: val.nombre!.trim(),
      precio: Number(val.precio),
      activo: val.disponible ?? true,
    };
    const catId = Number(val.categoriaId);

    const peticion$ = this.editAdicionalId
      ? this.adicionalService.updateAdicional(payload, catId)
      : this.adicionalService.addAdicional(payload, catId);

    peticion$
      .pipe(mergeMap(() => this.adicionalService.findAll()))
      .subscribe((d) => {
        this.cancelarEdicionAdicional();
        this.adicionales = d;
      });
  }

  editarAdicional(adic: Adicional): void {
    this.editAdicionalId = adic.id;
    this.adicionalForm.patchValue({
      nombre: adic.nombre,
      precio: adic.precio,
      disponible: adic.activo ?? true,
      categoriaId: adic.categoriaId ?? 1,
    });
  }

  cancelarEdicionAdicional(): void {
    this.editAdicionalId = null;
    this.adicionalForm.reset({ nombre: '', precio: 3000, disponible: true, categoriaId: 1 });
  }

  eliminarAdicional(id: number): void {
    this.adicionalService.deleteById(id).subscribe(() => {
      this.adicionales = this.adicionales.filter((a) => a.id !== id);
    });
  }

  // 2. CRUD de Categorías
  guardarCategoria(): void {
    if (this.categoriaForm.invalid) return;
    const nombre = this.categoriaForm.value.nombre!.trim();
    const payload: Categoria = {
      id: this.editCategoriaId ?? 0,
      nombre: nombre,
    };

    const peticion$ = this.editCategoriaId
      ? this.comidaService.updateCategoria(payload)
      : this.comidaService.addCategoria(payload);

    peticion$
      .pipe(mergeMap(() => this.comidaService.getCategorias()))
      .subscribe((c) => {
        this.editCategoriaId = null;
        this.categoriaForm.reset({ nombre: '' });
        this.categorias = c;
      });
  }

  editarCategoria(cat: Categoria): void {
    this.editCategoriaId = cat.id;
    this.categoriaForm.patchValue({ nombre: cat.nombre });
  }

  eliminarCategoria(id: number): void {
    this.comidaService.deleteCategoria(id).subscribe(() => {
      this.categorias = this.categorias.filter((c) => c.id !== id);
    });
  }

  // 3. CRUD de Domiciliarios
  guardarDomiciliario(): void {
    if (this.domiciliarioForm.invalid) return;
    const val = this.domiciliarioForm.value;
    const payload: Domiciliario = {
      id: this.editDomiciliarioId ?? 0,
      cedula: val.cedula!.trim(),
      nombre: val.nombre!.trim(),
      celular: val.celular!.trim(),
      disponible: val.disponible ?? true,
    };

    const peticion$ = this.editDomiciliarioId
      ? this.domiciliarioService.updateDomiciliario(payload)
      : this.domiciliarioService.addDomiciliario(payload);

    peticion$
      .pipe(mergeMap(() => this.domiciliarioService.findAll()))
      .subscribe((d) => {
        this.cancelarEdicionDomiciliario();
        this.domiciliarios = d;
      });
  }

  editarDomiciliario(dom: Domiciliario): void {
    this.editDomiciliarioId = dom.id;
    this.domiciliarioForm.patchValue({
      cedula: dom.cedula,
      nombre: dom.nombre,
      celular: dom.celular,
      disponible: dom.disponible,
    });
  }

  cancelarEdicionDomiciliario(): void {
    this.editDomiciliarioId = null;
    this.domiciliarioForm.reset({ cedula: '', nombre: '', celular: '', disponible: true });
  }

  eliminarDomiciliario(id: number): void {
    this.domiciliarioService.deleteById(id).subscribe(() => {
      this.domiciliarios = this.domiciliarios.filter((d) => d.id !== id);
    });
  }

  // 4. CRUD de Operadores
  guardarOperador(): void {
    if (this.operadorForm.invalid) return;
    const val = this.operadorForm.value;
    const payload: Operador = {
      id: this.editOperadorId ?? 0,
      nombre: val.nombre!.trim(),
      usuario: val.usuario!.trim(),
      contrasena: val.contrasena!.trim(),
    };

    const peticion$ = this.editOperadorId
      ? this.operadorService.updateOperador(payload)
      : this.operadorService.addOperador(payload);

    peticion$
      .pipe(mergeMap(() => this.operadorService.findAll()))
      .subscribe((o) => {
        this.cancelarEdicionOperador();
        this.operadores = o;
      });
  }

  editarOperador(op: Operador): void {
    this.editOperadorId = op.id;
    this.operadorForm.patchValue({
      nombre: op.nombre,
      usuario: op.usuario,
      contrasena: op.contrasena,
    });
  }

  cancelarEdicionOperador(): void {
    this.editOperadorId = null;
    this.operadorForm.reset({ nombre: '', usuario: '', contrasena: '' });
  }

  eliminarOperador(id: number): void {
    this.operadorService.deleteById(id).subscribe(() => {
      this.operadores = this.operadores.filter((o) => o.id !== id);
    });
  }

  // 5. CRUD de Administradores
  guardarAdministrador(): void {
    if (this.adminForm.invalid) return;
    const val = this.adminForm.value;
    const payload: Administrador = {
      id: this.editAdminId ?? 0,
      usuario: val.usuario!.trim(),
      contrasena: val.contrasena!.trim(),
    };

    const peticion$ = this.editAdminId
      ? this.administradorService.updateAdministrador(payload)
      : this.administradorService.addAdministrador(payload);

    peticion$
      .pipe(mergeMap(() => this.administradorService.findAll()))
      .subscribe((a) => {
        this.cancelarEdicionAdmin();
        this.administradores = a;
      });
  }

  editarAdministrador(adm: Administrador): void {
    this.editAdminId = adm.id;
    this.adminForm.patchValue({
      usuario: adm.usuario,
      contrasena: adm.contrasena,
    });
  }

  cancelarEdicionAdmin(): void {
    this.editAdminId = null;
    this.adminForm.reset({ usuario: '', contrasena: '' });
  }

  eliminarAdministrador(id: number): void {
    this.administradorService.deleteById(id).subscribe(() => {
      this.administradores = this.administradores.filter((a) => a.id !== id);
    });
  }
}
