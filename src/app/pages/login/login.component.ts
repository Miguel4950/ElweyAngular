import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { ClienteService } from '../../service/cliente.service';
import { OperadorService } from '../../service/operador.service';
import { AdministradorService } from '../../service/administrador.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // 1. Inyección de los 3 servicios de autenticación por entidad (Cliente, Operador, Administrador)
  private clienteService = inject(ClienteService);
  private operadorService = inject(OperadorService);
  private administradorService = inject(AdministradorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errorMessage: string = '';
  logoutMessage: boolean = false;
  portalAlert: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('CLIENTE', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['logout']) {
        this.logoutMessage = true;
      }
      if (params['portal']) {
        this.portalAlert = true;
      }
    });
  }

  onSubmit(): void {
    // 1. Validar que los campos obligatorios estén diligenciados
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor ingresa tu correo/usuario y contraseña.';
      return;
    }

    const identificador = (this.loginForm.value.email ?? '').trim();
    const password = this.loginForm.value.password ?? '';
    const rol = this.loginForm.value.rol ?? 'CLIENTE';

    // 2. Si el rol es OPERADOR y no es un correo de la tabla Cliente, autenticar contra /operadores/login
    if (rol === 'OPERADOR' && !identificador.includes('@')) {
      this.operadorService.autenticar(identificador, password).subscribe({
        next: (op) => {
          this.errorMessage = '';
          const sesionOp = new Cliente(
            op.id,
            op.nombre,
            `${op.usuario}@elwey.com`,
            op.contrasena,
            '3000000000',
            'Sede Principal El Wey',
          );
          this.clienteService.setClienteActual(sesionOp, 'OPERADOR');
          this.router.navigate(['/pedidos']);
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.mensaje || 'Credenciales de operador incorrectas.';
        },
      });
      return;
    }

    // 3. Si el rol es ADMIN y no es un correo de la tabla Cliente, autenticar contra /administradores/login
    if (rol === 'ADMIN' && !identificador.includes('@')) {
      this.administradorService.autenticar(identificador, password).subscribe({
        next: (adm) => {
          this.errorMessage = '';
          const sesionAdmin = new Cliente(
            adm.id,
            `Admin (${adm.usuario})`,
            `${adm.usuario}@elwey.com`,
            adm.contrasena,
            '3000000000',
            'Administración Central',
          );
          this.clienteService.setClienteActual(sesionAdmin, 'ADMIN');
          this.router.navigate(['/comidas/tabla']);
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.mensaje || 'Credenciales de administrador incorrectas.';
        },
      });
      return;
    }

    // 4. Autenticación estándar por correo electrónico contra POST /clientes/login
    this.clienteService.autenticar(identificador, password).subscribe({
      next: (clienteAutenticado) => {
        this.errorMessage = '';
        const correoLimpio = (clienteAutenticado.correo || clienteAutenticado.email || '').toLowerCase();
        if (correoLimpio === 'admin@elwey.com' || rol === 'ADMIN') {
          this.clienteService.setClienteActual(clienteAutenticado, 'ADMIN');
          this.router.navigate(['/comidas/tabla']);
        } else if (correoLimpio === 'operador@elwey.com' || rol === 'OPERADOR') {
          this.clienteService.setClienteActual(clienteAutenticado, 'OPERADOR');
          this.router.navigate(['/admin/vertodo']);
        } else {
          this.clienteService.setClienteActual(clienteAutenticado, 'CLIENTE');
          this.router.navigate(['/cliente/portal']);
        }
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.mensaje || 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
    });
  }

  cargarCredencial(emailOrUser: string, pass: string, rol: string = 'CLIENTE'): void {
    // 1. Rellenar automáticamente el formulario con la credencial y el rol seleccionados
    this.loginForm.patchValue({
      email: emailOrUser,
      password: pass,
      rol: rol,
    });
    this.errorMessage = '';
  }
}
