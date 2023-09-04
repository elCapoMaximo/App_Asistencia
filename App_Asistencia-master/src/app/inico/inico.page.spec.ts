import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicoPage } from './inico.page';

describe('InicoPage', () => {
  let component: InicoPage;
  let fixture: ComponentFixture<InicoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
