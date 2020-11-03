import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EditClientComponent } from './edit-client.component';

describe('EditClientComponent', () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;
    component.clientForm = formBuilder.group({
      firstName: null,
      lastName: null,
      mobileNumber: null,
      IDNumber: null,
      physicalAddress: null
  });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.clientForm;
    expect(form.valid).toBeFalsy();

    const formControls = form.controls;
    formControls.firstName.setValue('John');
    formControls.lastName.setValue('Doe');
    formControls.mobileNumber.setValue('0813456789');
    formControls.IDNumber.setValue('8791234567890');
    formControls.physicalAddress.setValue('10 Springbok Street');

    expect(form.valid).toBeTruthy();
  });
});
