import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-mi-portal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './mi-portal.component.html',
  styleUrl: './mi-portal.component.css',
})
export class MiPortalComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cliente: Cliente | null = null;
  mensajeActualizado: boolean = false;
  mensajeBienvenido: boolean = false;
  errorMessage: string = '';

  portalForm = new FormGroup({
    id: new FormControl<number | null>(null),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    fechaRegistro: new FormControl('15 de Enero, 2026'),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['bienvenido']) {
        this.mensajeBienvenido = true;
      }
      if (params['actualizado']) {
        this.mensajeActualizado = true;
      }
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const clienteEncontrado = this.clienteService.getClienteById(Number(idParam));
      if (clienteEncontrado) {
        this.cliente = clienteEncontrado;
      }
    }

    if (!this.cliente) {
      this.cliente = this.clienteService.getClienteActual();
    }

    // Si aún no hay sesión activa, cargamos el primer cliente de prueba para evaluación inmediata
    if (!this.cliente) {
      const lista = this.clienteService.getClientes();
      if (lista.length > 0) {
        this.cliente = lista[0];
        this.clienteService.setClienteActual(this.cliente);
      }
    }

    if (this.cliente) {
      this.cargarFormulario(this.cliente);
    }
  }

  cargarFormulario(cliente: Cliente): void {
    this.portalForm.patchValue({
      id: cliente.id,
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      fechaRegistro: '15 de Enero, 2026',
    });
  }

  onActualizar(): void {
    if (this.portalForm.invalid) {
      this.portalForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos con valores válidos.';
      return;
    }

    if (!this.cliente) {
      return;
    }

    const { nombre, correo, telefono, direccion } = this.portalForm.value;

    const clienteActualizado = new Cliente(
      this.cliente.id,
      nombre!.trim(),
      correo!.trim(),
      this.cliente.contrasena,
      telefono!.trim(),
      direccion!.trim(),
      this.cliente.activo,
      this.cliente.pedidos
    );

    this.clienteService.updateCliente(this.cliente.id, clienteActualizado);
    this.cliente = clienteActualizado;
    this.mensajeActualizado = true;
    this.mensajeBienvenido = false;
    this.errorMessage = '';
  }

  onRestablecer(): void {
    if (this.cliente) {
      this.cargarFormulario(this.cliente);
      this.mensajeActualizado = false;
      this.errorMessage = '';
    }
  }

  onEliminarCuenta(): void {
    if (!this.cliente) {
      return;
    }

    const confirmado = confirm(
      '¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.'
    );

    if (confirmado) {
      const idAEliminar = this.cliente.id;
      this.clienteService.eliminarCliente(idAEliminar);
      this.router.navigate(['/']);
    }
  }
}
