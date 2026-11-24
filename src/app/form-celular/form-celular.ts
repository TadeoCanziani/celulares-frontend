import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Celular } from '../models/celular';
import { Marca } from '../models/marca';
import { DatosCelular } from '../service-datos-celular';
import { DatosMarca } from '../service-datos-marcas';

@Component({
  selector: 'form-celular',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-celular.html',
  styleUrl: './form-celular.scss',
})
export class CelularForm implements OnInit {
  celular: Omit<Celular, 'id' | 'marcaId'> & { id?: number; marcaId: number | null } = {
    nombre: '',
    tamano: '',
    memoriaRam: '',
    espacioAlmacenamiento: '',
    nucleos: 0,
    marcaId: null,
    imagen: '',
  };
  esEdicion = false;
  marcas = signal<Marca[]>([]);
  errorMarcas = signal(false);
  error = signal('');
  cargando = signal(false);
  errorCarga = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datosCelular: DatosCelular,
    private datosMarca: DatosMarca
  ) {}

  ngOnInit(): void {
    this.datosMarca.getAll().subscribe({
      next: (marcas) => this.marcas.set(marcas),
      error: (err) => {
        console.error('Error al cargar las marcas:', err);
        this.errorMarcas.set(true);
      },
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const celularId = Number(id);
      if (!Number.isInteger(celularId) || celularId <= 0) {
        this.error.set('El identificador del celular no es válido.');
        this.errorCarga.set(true);
        return;
      }

      this.esEdicion = true;
      this.cargando.set(true);
      this.datosCelular.getById(celularId).subscribe({
        next: (c) => {
          this.celular = { ...c };
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error al cargar el celular para editar:', err);
          this.error.set('No se pudo cargar el celular para editar.');
          this.errorCarga.set(true);
          this.cargando.set(false);
        },
      });
    }
  }

  guardar() {
    if (this.errorCarga()) {
      return;
    }

    const marcaId = this.celular.marcaId;
    if (marcaId === null) {
      this.error.set('Seleccioná una marca.');
      return;
    }

    this.error.set('');
    const celular = { ...this.celular, marcaId };
    if (this.esEdicion) {
      if (this.celular.id === undefined) {
        this.error.set('No se pudo identificar el celular para editar.');
        return;
      }

      this.datosCelular.update(this.celular.id, celular).subscribe({
        next: () => this.router.navigate(['/celulares']),
        error: (err) => {
          console.error('Error al editar el celular:', err);
          this.error.set('No se pudo editar el celular.');
        },
      });
    } else {
      this.datosCelular.create(celular).subscribe({
        next: () => this.router.navigate(['/celulares']),
        error: (err) => {
          console.error('Error al crear el celular:', err);
          this.error.set('No se pudo crear el celular.');
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/celulares']);
  }
}