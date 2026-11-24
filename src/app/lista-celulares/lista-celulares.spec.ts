import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ListaCelulares } from './lista-celulares';
import { DatosCelular } from '../service-datos-celular';
import { DatosMarca } from '../service-datos-marcas';
import { FiltrosCelularService } from '../filtros-celulares.service';

describe('ListaCelulares', () => {
  let component: ListaCelulares;
  let fixture: ComponentFixture<ListaCelulares>;

  beforeEach(async () => {
    const celular = {
      id: 123,
      nombre: 'Celular de prueba',
      tamano: '6.1',
      memoriaRam: '8GB',
      espacioAlmacenamiento: '128GB',
      nucleos: 8,
      imagen: '',
      marcaId: 2,
    };

    await TestBed.configureTestingModule({
      imports: [ListaCelulares],
      providers: [
        provideRouter([]),
        { provide: DatosCelular, useValue: { buscar: () => of([celular]) } },
        { provide: DatosMarca, useValue: { getAll: () => of([{ id: 2, nombre: 'Samsung' }]) } },
        { provide: FiltrosCelularService, useValue: { filtros$: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCelulares);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hides the celular ID and displays its brand name', () => {
    const table = fixture.nativeElement.querySelector('table') as HTMLTableElement;

    expect(table.tHead?.textContent).not.toContain('#');
    expect(table.tBodies[0].textContent).toContain('Samsung');
    expect(table.tBodies[0].textContent).not.toContain('123');
  });
});
