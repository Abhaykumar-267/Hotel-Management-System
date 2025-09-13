import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBookingComponent } from './find-booking.component';

describe('FindBookingComponent', () => {
  let component: FindBookingComponent;
  let fixture: ComponentFixture<FindBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
