import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCityComponent } from './yourcity.component';

describe('YourCityComponent', () => {
  let component: YourCityComponent;
  let fixture: ComponentFixture<YourCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourCityComponent]
    });
    fixture = TestBed.createComponent(YourCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
