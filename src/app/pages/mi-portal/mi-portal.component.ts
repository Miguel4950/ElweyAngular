import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { mergeMap } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { ClienteService } from '../../service/cliente.service';
import { PedidoService } from '../../service/pedido.service';
import { Cliente } from '../../models/cliente.model';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-mi-portal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DecimalPipe,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './mi-portal.component.html',
  styleUrl: './mi-portal.component.css',
})
export class MiPortalComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cliente: Cliente | null = null;
  pedidosCliente: Pedido[] = [];
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

    // 1. Determinar el ID del cliente por ruta o sesión activa, o cargar el cliente 1 por defecto
    const idParam = this.route.snapshot.paramMap.get('id');
    const sesionActual = this.clienteService.getClienteActual();
    const targetId = idParam ? Number(idParam) : sesionActual?.id ?? 1;

    // 2. Consultar datos del cliente y encadenar con mergeMap la consulta de sus pedidos
    this.clienteService
      .findById(targetId)
      .pipe(
        mergeMap((clienteInfo) => {
          this.cliente = clienteInfo;
          if (!sesionActual) {
            this.clienteService.setClienteActual(clienteInfo);
          }
          this.cargarFormulario(clienteInfo);
          return this.pedidoService.findByCliente(clienteInfo.id);
        }),
      )
      .subscribe({
        next: (pedidosList) => {
          this.pedidosCliente = pedidosList;
        },
        error: () => {
          this.errorMessage = 'No se pudo cargar la información del cliente desde el servidor.';
        },
      });
  }

  cargarFormulario(cliente: Cliente): void {
    this.portalForm.patchValue({
      id: cliente.id,
      nombre: cliente.nombreCompleto || cliente.nombre,
      correo: cliente.correo || cliente.email || '',
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      fechaRegistro: cliente.fechaRegistro || '15 de Enero, 2026',
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

    const { nombre, correo, telefono, direccion, fechaRegistro } = this.portalForm.value;
    const correoLimpio = correo!.trim();

    const clienteActualizado = new Cliente(
      this.cliente.id,
      nombre!.trim(),
      correoLimpio,
      this.cliente.contrasena || this.cliente.password || '',
      telefono!.trim(),
      direccion!.trim(),
      this.cliente.activo ?? true,
      [],
      '',
      correoLimpio,
      this.cliente.contrasena || this.cliente.password || '',
      fechaRegistro || this.cliente.fechaRegistro,
    );

    // 1. Enviar actualización por PUT /clientes/update
    this.clienteService.updateCliente(this.cliente.id, clienteActualizado).subscribe({
      next: (res) => {
        this.cliente = res;
        this.clienteService.setClienteActual(res, this.clienteService.getRolActual());
        this.cargarFormulario(res);
        this.mensajeActualizado = true;
        this.mensajeBienvenido = false;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.mensaje || 'No fue posible actualizar los datos del cliente.';
      },
    });
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
      '¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.',
    );

    if (confirmado) {
      const idAEliminar = this.cliente.id;
      this.clienteService.deleteById(idAEliminar).subscribe(() => {
        this.clienteService.cerrarSesion();
        this.router.navigate(['/']);
      });
    }
  }
}
