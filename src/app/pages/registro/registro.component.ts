import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-registro',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  // DI
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  errorMessage: string = '';

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(4)]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    // 1. Validar que el formulario esté completo antes de enviar al backend
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos obligatorios correctamente.';
      return;
    }

    const { nombre, correo, contrasena, telefono, direccion } = this.registroForm.value;
    const emailLimpio = (correo ?? '').trim().toLowerCase();

    const nuevoCliente: Cliente = {
      id: 0,
      nombre: nombre!.trim(),
      correo: emailLimpio,
      contrasena: contrasena!,
      telefono: telefono!.trim(),
      direccion: direccion!.trim(),
      activo: true,
      pedidos: [],
      apellido: '',
      email: emailLimpio,
      password: contrasena!,
    };

    // 2. Registrar cliente mediante POST /clientes/add y redirigir a su portal
    this.clienteService.addCliente(nuevoCliente).subscribe({
      next: (creado) => {
        this.errorMessage = '';
        this.clienteService.setClienteActual(creado, 'CLIENTE');
        this.router.navigate(['/cliente/portal'], { queryParams: { bienvenido: 'true' } });
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.mensaje || 'Ya existe una cuenta registrada con este correo electrónico.';
      },
    });
  }
}
