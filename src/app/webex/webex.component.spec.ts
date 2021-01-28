import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebexComponent } from './webex.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { Room } from '../models/room.model';

describe('WebexComponent', () => {
  let component: WebexComponent;
  let fixture: ComponentFixture<WebexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserModule, AppRoutingModule],
      declarations: [WebexComponent, DialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Webex app should contain the input boxes and buttons', () => {
    fixture = TestBed.createComponent(WebexComponent);
    component = fixture.componentInstance;
    component.room[0] = new Room();
    component.room[0].id = '12345';
    component.room[0].title = 'My test room';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#createRoom').textContent).toEqual(
        'Create Room'
      );
      expect(compiled.querySelector('#addMember').textContent).toEqual(
        'Add Member'
      );
      expect(compiled.querySelector('#sendMessage').textContent).toEqual(
        'Send'
      );
      expect(compiled.querySelector('#logout').textContent).toEqual('Logout');
      expect(compiled.querySelector('#webexRooms').textContent).toEqual(
        'My test room '
      );
      expect(compiled.querySelector('#roomName')).toBeTruthy();
      expect(compiled.querySelector('#memberEmail')).toBeTruthy();
      expect(compiled.querySelector('#message')).toBeTruthy();
    });
  });
});
