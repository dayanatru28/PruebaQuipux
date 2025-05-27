import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdministradorComponent } from './productos-administrador.component';

describe('ProductosAdministradorComponent', () => {
  let component: ProductosAdministradorComponent;
  let fixture: ComponentFixture<ProductosAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
