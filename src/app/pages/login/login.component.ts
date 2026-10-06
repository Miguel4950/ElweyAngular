import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { ClienteService } from '../../service/cliente.service';

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
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errorMessage: string = '';
  logoutMessage: boolean = false;
  portalAlert: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor ingresa un correo y contraseña válidos.';
      return;
    }

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    const cliente = this.clienteService.autenticar(email, password);

    if (cliente) {
      this.errorMessage = '';
      this.router.navigate(['/cliente/portal']);
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
    }
  }

  cargarCredencial(email: string, pass: string): void {
    this.loginForm.patchValue({
      email: email,
      password: pass,
    });
    this.errorMessage = '';
  }
}
