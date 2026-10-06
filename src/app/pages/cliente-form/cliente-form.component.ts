import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
})
export class ClienteFormComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  clienteId: number | undefined = undefined;
  isEdit = false;

  clienteForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9+\s\-]{7,15}$/),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150),
    ]),
    activo: new FormControl(true, [Validators.required]),
  });

  ngOnInit(): void {
    const paramId = this.activatedRoute.snapshot.params['id'];
    this.clienteId = paramId ? Number(paramId) : undefined;

    if (this.clienteId) {
      this.isEdit = true;
      const cliente = this.clienteService.getClienteById(this.clienteId);

      if (cliente) {
        this.clienteForm.patchValue({
          nombre: cliente.nombre,
          correo: cliente.correo,
          contrasena: cliente.contrasena,
          telefono: cliente.telefono,
          direccion: cliente.direccion,
          activo: cliente.activo,
        });
      }
    }
  }

  handleSubmit(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const val = this.clienteForm.value;

    const cliente: Cliente = new Cliente(
      this.clienteId ?? 0,
      val.nombre ?? 'Cliente Desconocido',
      val.correo ?? 'correo@desconocido.com',
      val.contrasena ?? '123456',
      val.telefono ?? '0000000000',
      val.direccion ?? 'Dirección no especificada',
      val.activo ?? true,
      [],
    );

    if (this.isEdit && this.clienteId) {
      this.clienteService.updateCliente(this.clienteId, cliente);
    } else {
      this.clienteService.addCliente(cliente);
    }

    this.router.navigate(['/clientes']);
  }
}
