import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[appDeadline]',
  providers: [{provide: NG_VALIDATORS, useExisting: DeadlineValidatorDirective, multi: true}]
})
export class DeadlineValidatorDirective implements Validator {
  
    validate(control: AbstractControl): ValidationErrors | null {
        return identityRevealedValidator(control);
      }

}

export const identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const deadlineDate = control.get('deadlineDate');
    const deadlineTime = control.get('deadlineTime');

    let now = new Date();

    if (deadlineDate !== null) {

        let dDate = new Date(deadlineDate.value);

        if (deadlineTime !== null && deadlineTime.value !== null && deadlineTime.value !== undefined && deadlineTime.value !== "") {
            dDate.setHours(+(deadlineTime.value.split(":")[0]));
            dDate.setMinutes(+(deadlineTime.value.split(":")[1]));
        }
        else {
            now.setHours(0, 0, 0, 0);
            dDate.setHours(0, 0, 0, 0);
        }

        if (dDate <= now) {
            return { deadlineError: true };
        }
    }

    return null;
};