import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from './password-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  submitted = false;
  isWorking = false;

  signupForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(new RegExp('(?=.*[0-9])'), {
            requiresDigit: true,
          }),
          PasswordValidators.patternValidator(new RegExp('(?=.*[A-Z])'), {
            requiresUppercase: true,
          }),
          PasswordValidators.patternValidator(new RegExp('(?=.*[a-z])'), {
            requiresLowercase: true,
          }),
          PasswordValidators.patternValidator(new RegExp('(?=.*[$@^!%*?&])'), {
            requiresSpecialChars: true,
          }),
        ])
      ),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: PasswordValidators.MatchValidator,
    }
  );

  // convenience getter for easy access to form controls
  get f() {
    return this.signupForm.controls;
  }

  get passwordValid() {
    return this.signupForm.controls['password'].errors === null;
  }

  get requiredValid() {
    return !this.signupForm.controls['password'].hasError('required');
  }

  get minLengthValid() {
    return !this.signupForm.controls['password'].hasError('minlength');
  }

  get requiresDigitValid() {
    return !this.signupForm.controls['password'].hasError('requiresDigit');
  }

  get requiresUppercaseValid() {
    return !this.signupForm.controls['password'].hasError('requiresUppercase');
  }

  get requiresLowercaseValid() {
    return !this.signupForm.controls['password'].hasError('requiresLowercase');
  }

  get requiresSpecialCharsValid() {
    return !this.signupForm.controls['password'].hasError('requiresSpecialChars');
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.isWorking = true;
    this.signupForm.disable();

    setTimeout(() => {
      this.isWorking = false;
      this.signupForm.enable();
    }, 1500);
  }
}
