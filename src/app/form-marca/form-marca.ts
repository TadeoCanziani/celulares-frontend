import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosMarca } from '../service-datos-marcas';

@Component({
  imports: [FormsModule],
  selector: 'app-form-marca',
  styleUrl: './form-marca.scss',
  templateUrl: './form-marca.html',
})
export class FormMarca implements OnInit {
  nombre = signal('');
  id = signal<number | null>(null);
  esEdicion = signal(false);
  cargando = signal(false);
  guardando = signal(false);
  error = signal('');

  constructor(
    private datosMarca: DatosMarca,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      return;
    }

    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) {
      this.error.set('El identificador de la marca no es válido.');
      return;
    }

    this.id.set(id);
    this.esEdicion.set(true);
    this.cargando.set(true);
    this.datosMarca.getById(id).subscribe({
      next: (marca) => {
        this.nombre.set(marca.nombre);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar la marca para editar:', err);
        this.error.set('No se pudo cargar la marca para editar.');
        this.cargando.set(false);
      },
    });
  }

  guardar(): void {
    const nombre = this.nombre().trim();
    if (!nombre || this.guardando()) {
      return;
    }

    this.guardando.set(true);
    this.error.set('');
    const id = this.id();
    const guardar = this.esEdicion() && id !== null
      ? this.datosMarca.update(id, { nombre })
      : this.datosMarca.create({ nombre });

    guardar.subscribe({
      next: () => this.router.navigate(['/marcas']),
      error: (err) => {
        console.error(this.esEdicion() ? 'Error al editar la marca:' : 'Error al crear la marca:', err);
        this.error.set(this.esEdicion() ? 'No se pudo editar la marca.' : 'No se pudo crear la marca.');
        this.guardando.set(false);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/marcas']);
  }
}
