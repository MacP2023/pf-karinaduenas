import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentDBComponent } from './estudent-db.component';

describe('EstudentDBComponent', () => {
  let component: EstudentDBComponent;
  let fixture: ComponentFixture<EstudentDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudentDBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
