import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { User } from "src/app/models/auth/user.model";

@Directive({
    selector: '[appAssigneeValidation]',
    providers: [{provide: NG_VALIDATORS, useExisting: AssigneeValidatorDirective, multi: true}]
})
export class AssigneeValidatorDirective implements Validator {
    @Input('appAssignee') assignee!: User;

    validate(control: AbstractControl): ValidationErrors | null {
        return assigneeValidator(control);
    }
}

export const assigneeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    console.log(value);

    if (value === null || value === undefined) {
        return { assigneeError: true };
    }

    return null;
};