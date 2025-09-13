import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeSelectorComponent } from './room-type-selector.component';

describe('RoomTypeSelectorComponent', () => {
  let component: RoomTypeSelectorComponent;
  let fixture: ComponentFixture<RoomTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
