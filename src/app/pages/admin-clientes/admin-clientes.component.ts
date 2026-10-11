import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mergeMap } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './admin-clientes.component.html',
  styleUrl: './admin-clientes.component.css',
})
export class AdminClientesComponent implements OnInit {
  // 1. Inyección de ClienteService para consumir el CRUD REST de clientes
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  busqueda: string = '';
  editClienteId: number | null = null;
  mostrarFormulario: boolean = false;
  mensajeFeedback: string = '';
  errorMessage: string = '';

  clienteForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl(''),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl(''),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    // 1. Consultar todos los clientes registrados en GET /clientes/all
    this.clienteService.findAll().subscribe((data) => {
      this.clientes = data;
    });
  }

  onBuscar(event: Event): void {
    this.busqueda = (event.target as HTMLInputElement).value;
  }

  get clientesFiltrados(): Cliente[] {
    if (!this.busqueda) {
      return this.clientes;
    }
    const q = this.busqueda.toLowerCase();
    return this.clientes.filter(
      (c) =>
        (c.nombreCompleto || c.nombre || '').toLowerCase().includes(q) ||
        (c.correo || c.email || '').toLowerCase().includes(q) ||
        (c.telefono || '').toLowerCase().includes(q) ||
        (c.direccion || '').toLowerCase().includes(q),
    );
  }

  abrirNuevoCliente(): void {
    this.editClienteId = null;
    this.mostrarFormulario = true;
    this.errorMessage = '';
    this.clienteForm.reset({
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      telefono: '',
      direccion: '',
    });
  }

  editarCliente(cli: Cliente): void {
    this.editClienteId = cli.id;
    this.mostrarFormulario = true;
    this.errorMessage = '';
    this.clienteForm.patchValue({
      nombre: cli.nombre,
      apellido: cli.apellido || '',
      correo: cli.correo || cli.email || '',
      contrasena: '',
      telefono: cli.telefono,
      direccion: cli.direccion,
    });
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.editClienteId = null;
    this.errorMessage = '';
  }

  guardarCliente(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const val = this.clienteForm.value;
    const correoLimpio = (val.correo ?? '').trim().toLowerCase();
    const pass = val.contrasena ? val.contrasena.trim() : '';

    const payload = new Cliente(
      this.editClienteId ?? 0,
      val.nombre!.trim(),
      correoLimpio,
      pass || 'cliente123',
      val.telefono!.trim(),
      val.direccion!.trim(),
      true,
      [],
      (val.apellido ?? '').trim(),
      correoLimpio,
      pass,
    );

    // 1. Enviar petición PUT /clientes/update o POST /clientes/add y encadenar findAll() con mergeMap
    const idEditado = this.editClienteId;
    const peticion$ = idEditado
      ? this.clienteService.updateCliente(idEditado, payload)
      : this.clienteService.addCliente(payload);

    peticion$
      .pipe(mergeMap(() => this.clienteService.findAll()))
      .subscribe({
        next: (clientesActualizados) => {
          this.clientes = clientesActualizados;
          this.mensajeFeedback = idEditado
            ? `Cliente #${idEditado} actualizado con éxito.`
            : 'Nuevo cliente registrado con éxito.';
          this.cancelarFormulario();
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.mensaje || 'Error al guardar el cliente en el servidor.';
        },
      });
  }

  eliminarCliente(cli: Cliente): void {
    const ok = confirm(
      `¿Deseas eliminar al cliente ${cli.nombreCompleto || cli.nombre} y sus pedidos asociados?`,
    );
    if (!ok) return;

    this.clienteService.deleteById(cli.id).subscribe(() => {
      this.clientes = this.clientes.filter((c) => c.id !== cli.id);
      this.mensajeFeedback = `Cliente #${cli.id} eliminado del sistema.`;
    });
  }
}
