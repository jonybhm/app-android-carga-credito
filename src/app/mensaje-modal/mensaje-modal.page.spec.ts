import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajeModalPage } from './mensaje-modal.page';

describe('MensajeModalPage', () => {
  let component: MensajeModalPage;
  let fixture: ComponentFixture<MensajeModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
