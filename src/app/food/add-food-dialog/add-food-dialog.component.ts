import { finalize } from 'rxjs/internal/operators/finalize';
import { ProfileService } from './../../profile/profile.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FoodService } from './../food.service';
import { Food } from './../../shared/entities/food';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
})
export class AddFoodDialogComponent implements OnInit {

  selectedMeal: string;
  addFoodForm: FormGroup;
  mealTypes: Array<string>;
  otherSelected: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddFoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food,
    private fb: FormBuilder,
    private foodService: FoodService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.mealTypes = this.profileService.user.mealTypes;
    this.addFoodForm = this.fb.group({
      quantity: ['100', [Validators.required]],
      meal: ['', [Validators.required]],
      other: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup) {
    let meal = form.value.meal;
    if (form.value.meal === 'Other') {
      this.addFoodForm.setControl('other', new FormControl(form.value.other, Validators.required));
      meal = form.value.other;
    } else {
      this.addFoodForm.setControl('other', new FormControl());
    }

    if (!form.valid) {
      return;
    }

    this.spinner.show();
    this.foodService.addToDiary(this.data, form.value.quantity, meal)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        if (form.value.meal === 'Other') {
          this.mealTypes.push(meal);
          this.profileService.setMealTypes(this.mealTypes).subscribe();
        }
        this.dialogRef.close();
      });
  }
}