import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListaMarcas } from './lista-marcas';
import { DatosMarca } from '../service-datos-marcas';

describe('ListaMarcas', () => {
  let component: ListaMarcas;
  let fixture: ComponentFixture<ListaMarcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMarcas],
      providers: [
        { provide: DatosMarca, useValue: { getAll: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMarcas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
