import {FormControl} from "@angular/forms";

export class DateValidator {
  static afterToday(control: FormControl): { [s: string]: any } {
    const today = new Date();
    if (new Date(control.value) < today) {
      return {"beforeToday": true};
    }
    return null;
  }

  static beforeToday(control: FormControl): { [s: string]: any } {
    const today = new Date();
    if (new Date(control.value) > today) {
      return {"afterToday": true};
    }
    return null;
  }
}
