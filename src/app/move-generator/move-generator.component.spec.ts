import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveGeneratorComponent } from './move-generator.component';

describe('MoveGeneratorComponent', () => {
  let component: MoveGeneratorComponent;
  let fixture: ComponentFixture<MoveGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
