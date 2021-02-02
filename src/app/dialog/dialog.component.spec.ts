import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DEFAULT_LANGUAGE,
  FakeMissingTranslationHandler,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE,
} from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let okBtn: HTMLButtonElement;
  let cancelBtn: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [TranslateModule],
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
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should contain the ok and cancel buttons', async(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.showOk = true;
    component.showCancel = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      okBtn = fixture.debugElement.query(By.css('#ok-btn')).nativeElement;
      cancelBtn = fixture.debugElement.query(By.css('#cancel-btn'))
        .nativeElement;
      expect(okBtn.textContent).toEqual('DIALOG.OK');
      expect(cancelBtn.textContent).toEqual('DIALOG.CANCEL');
    });
  }));

  it('it should emit okDialogEvent on clicking ok button', async(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      spyOn(component.okDialogEvent, 'emit');
      component.okModal();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.okDialogEvent.emit).toHaveBeenCalled();
      });
    });
  }));

  it('it should emit cancelDialogEvent on clicking cancel button', async(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      spyOn(component.cancelDialogEvent, 'emit');
      component.cancelModal();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.cancelDialogEvent.emit).toHaveBeenCalled();
      });
    });
  }));
});
