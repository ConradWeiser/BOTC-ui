import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightOrderComponent } from './night-order.component';

describe('NightOrderComponent', () => {
  let component: NightOrderComponent;
  let fixture: ComponentFixture<NightOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
