import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebexComponent } from './webex.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { Room } from '../models/room.model';
import {
  USE_DEFAULT_LANG,
  USE_STORE,
  USE_EXTEND,
  DEFAULT_LANGUAGE,
  TranslateService,
  TranslateStore,
  TranslateLoader,
  TranslateCompiler,
  TranslateParser,
  MissingTranslationHandler,
  TranslateModule,
  FakeMissingTranslationHandler,
} from '@ngx-translate/core';
import { LoggerConfig, LoggerModule, NGXLoggerHttpService } from 'ngx-logger';
import { HttpBackend } from '@angular/common/http';

describe('WebexComponent', () => {
  let component: WebexComponent;
  let fixture: ComponentFixture<WebexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        TranslateModule,
        LoggerModule,
      ],
      declarations: [WebexComponent, DialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: USE_DEFAULT_LANG },
        { provide: USE_STORE },
        { provide: USE_EXTEND },
        { provide: DEFAULT_LANGUAGE },
        {
          provide: MissingTranslationHandler,
          useClass: FakeMissingTranslationHandler,
        },
        TranslateService,
        TranslateStore,
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        NGXLoggerHttpService,
        HttpBackend,
        LoggerConfig,
      ],
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
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#createRoom').textContent).toEqual(
        'WEBEX.CREATEROOM'
      );
    });
  });

  it('it should display the send message & add member after contacts are loaded', () => {
    fixture = TestBed.createComponent(WebexComponent);
    component = fixture.componentInstance;
    component.room[0] = new Room();
    component.room[0].id = '12345';
    component.room[0].title = 'My test room';
    component.webexSpace = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#addMember').textContent).toEqual(
        'WEBEX.ADDMEMBER'
      );
      expect(compiled.querySelector('#sendMessage').textContent).toEqual(
        'WEBEX.SEND'
      );
      expect(compiled.querySelector('#webexRooms').textContent).toEqual(
        'My test room '
      );
      expect(compiled.querySelector('#roomName')).toBeTruthy();
      expect(compiled.querySelector('#memberEmail')).toBeTruthy();
      expect(compiled.querySelector('#message')).toBeTruthy();
    });
  });
});
