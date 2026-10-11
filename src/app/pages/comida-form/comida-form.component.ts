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
import { Comida } from '../../models/comida.model';
import { Categoria } from '../../models/categoria.model';
import { ComidaService } from '../../service/comida.service';

@Component({
  selector: 'app-comida-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './comida-form.component.html',
  styleUrl: './comida-form.component.css',
})
export class ComidaFormComponent implements OnInit {
  // 1. Inyección de dependencias funcional
  private comidaService = inject(ComidaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  comidaId: number | undefined = undefined;
  isEdit = false;
  categorias: Categoria[] = [];

  comidaForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(80),
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^[0-9]+(\.[0-9]+)?$/),
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    categoriaId: new FormControl('', [Validators.required]),
    etiqueta: new FormControl('Estrella', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    imagen_url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/[\w\-]+(\.[\w\-]+)*(:\d+)?(\/[^\s]*)?|\/[a-zA-Z0-9_\-\.\/]+)$/i,
      ),
    ]),
    activo: new FormControl(true, [Validators.required]),
  });

  ngOnInit(): void {
    // 1. Cargar listado de categorías desde el backend REST
    this.comidaService.getCategorias().subscribe((cats) => {
      this.categorias = cats;
    });

    // 2. Verificar si existe parámetro id en la ruta para activar modo edición
    this.comidaId = Number(this.activatedRoute.snapshot.params['id']);
    if (this.comidaId) {
      this.isEdit = true;
      this.comidaService.findById(this.comidaId).subscribe((comida) => {
        if (comida) {
          this.comidaForm.patchValue({
            nombre: comida.nombre,
            precio: comida.precio.toString(),
            descripcion: comida.descripcion,
            categoriaId: comida.categoria ? comida.categoria.id.toString() : '1',
            etiqueta: comida.etiqueta,
            imagen_url: comida.imagen_url || comida.imagenUrl || '',
            activo: comida.activo ?? true,
          });
        }
      });
    }
  }

  handleSubmit(): void {
    // 1. Validar formulario antes de enviar petición HTTP
    if (!this.comidaForm.valid) {
      this.comidaForm.markAllAsTouched();
      return;
    }

    const val = this.comidaForm.value;
    const cat =
      this.categorias.find((c) => c.id === Number(val.categoriaId)) ||
      this.categorias[0] ||
      new Categoria(Number(val.categoriaId) || 1, 'Tacos');

    const imgUrl =
      val.imagen_url && val.imagen_url.trim() !== ''
        ? val.imagen_url.trim()
        : '/images/comidas/tacos-al-pastor.jpg';

    const plato: Comida = {
      id: this.comidaId ?? 0,
      nombre: val.nombre ?? 'Plato Nuevo',
      precio: Number(val.precio),
      descripcion: val.descripcion ?? '',
      imagen_url: imgUrl,
      imagenUrl: imgUrl,
      etiqueta: val.etiqueta ?? 'Estrella',
      activo: val.activo ?? true,
      categoria: cat,
    };

    // 2. Enviar POST o PUT al backend y redirigir al inventario cuando responda el servidor
    if (this.isEdit && this.comidaId) {
      this.comidaService.updateComida(this.comidaId, plato).subscribe(() => {
        this.router.navigate(['/comidas/tabla']);
      });
    } else {
      this.comidaService.addComida(plato).subscribe(() => {
        this.router.navigate(['/comidas/tabla']);
      });
    }
  }
}
