import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FormMarca } from './form-marca';
import { DatosMarca } from '../service-datos-marcas';

describe('FormMarca', () => {
  let component: FormMarca;
  let fixture: ComponentFixture<FormMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMarca],
      providers: [
        provideRouter([]),
        { provide: DatosMarca, useValue: { create: () => of({ id: 1, nombre: 'Marca' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMarca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
