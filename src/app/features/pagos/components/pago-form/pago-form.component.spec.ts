import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFormComponent } from './pago-form.component';

describe('PagoFormComponent', () => {
  let component: PagoFormComponent;
  let fixture: ComponentFixture<PagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
