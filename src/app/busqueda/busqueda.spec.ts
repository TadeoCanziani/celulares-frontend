import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Busqueda } from './busqueda';
import { FiltrosCelularService } from '../filtros-celulares.service';

describe('Busqueda', () => {
  let component: Busqueda;
  let fixture: ComponentFixture<Busqueda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busqueda],
    }).compileComponents();

    fixture = TestBed.createComponent(Busqueda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clears all filters and restores the complete list', () => {
    const filtros = TestBed.inject(FiltrosCelularService);
    const actualizar = vi.spyOn(filtros, 'actualizar');
    component.filtro = { nombre: 'Galaxy', memoriaRam: '8GB', marcaId: '1' };

    component.limpiar();

    expect(component.filtro).toEqual({});
    expect(actualizar).toHaveBeenCalledWith({});
  });
});
