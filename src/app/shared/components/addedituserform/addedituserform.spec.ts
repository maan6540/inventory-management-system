import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Addedituserform } from './addedituserform';

describe('Addedituserform', () => {
  let component: Addedituserform;
  let fixture: ComponentFixture<Addedituserform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addedituserform],
    }).compileComponents();

    fixture = TestBed.createComponent(Addedituserform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
