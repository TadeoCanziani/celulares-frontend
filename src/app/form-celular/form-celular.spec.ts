import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCelular } from './form-celular';

describe('FormCelular', () => {
  let component: FormCelular;
  let fixture: ComponentFixture<FormCelular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCelular],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCelular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
