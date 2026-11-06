import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCelulares } from './lista-celulares';

describe('ListaCelulares', () => {
  let component: ListaCelulares;
  let fixture: ComponentFixture<ListaCelulares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCelulares],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCelulares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
