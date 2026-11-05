import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoPage } from './directo.page';

describe('DirectoPage', () => {
  let component: DirectoPage;
  let fixture: ComponentFixture<DirectoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
