import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTournamentModalComponent } from './add-tournament-modal.component';

describe('AddTournamentModalComponent', () => {
  let component: AddTournamentModalComponent;
  let fixture: ComponentFixture<AddTournamentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTournamentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTournamentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
