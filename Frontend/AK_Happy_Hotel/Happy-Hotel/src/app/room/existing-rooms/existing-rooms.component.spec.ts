import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingRoomsComponent } from './existing-rooms.component';

describe('ExistingRoomsComponent', () => {
  let component: ExistingRoomsComponent;
  let fixture: ComponentFixture<ExistingRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
