import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { DialogComponent } from '../dialog/dialog.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserModule, AppRoutingModule, TranslateModule],
      declarations: [HeaderComponent, DialogComponent],
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have the logout button', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#logout').textContent).toEqual('HEADER.LOGOUT');
    });
  });
});
