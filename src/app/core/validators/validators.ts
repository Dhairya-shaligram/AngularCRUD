import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('newPassword')?.value;
    const confirmPassword = AC.get('confirmPassword')?.value;

    // Check if either control is touched or dirty before running the validation
    if (AC.get('confirmPassword')?.touched || AC.get('confirmPassword')?.dirty) {
      if (password !== confirmPassword) {
        AC.get('confirmPassword')?.setErrors({ MatchPassword: true });
      } else {
        AC.get('confirmPassword')?.setErrors(null); // Clear the error if passwords match
      }
    }

    return null; // Always return null because errors are set directly
  }
}
