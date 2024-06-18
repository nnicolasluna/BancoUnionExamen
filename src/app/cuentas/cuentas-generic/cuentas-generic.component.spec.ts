import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasGenericComponent } from './cuentas-generic.component';

describe('CuentasGenericComponent', () => {
  let component: CuentasGenericComponent;
  let fixture: ComponentFixture<CuentasGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentasGenericComponent]
    });
    fixture = TestBed.createComponent(CuentasGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
