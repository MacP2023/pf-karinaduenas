import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDatailComponent } from './student-datail.component';

describe('StudentDatailComponent', () => {
  let component: StudentDatailComponent;
  let fixture: ComponentFixture<StudentDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDatailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
