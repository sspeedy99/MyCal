import { ProfileService } from './../../profile/profile.service';
import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { DiaryService } from './diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  hasGoal: boolean;
  summary: any;
  meals: Array<any>;
  breakfast: any;
  lunch: any;
  dinner: any;
  snack: any;
  day = {
    date: new Date(),
    name: 'Today'
  };

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.hasGoal = Object.keys(this.profileService.user.goal).length !== 0;
    if (!this.diaryService.summary || !this.diaryService.meals) {
      this.spinner.show();
      this.getDay();
    } else {
      this.summary = this.diaryService.summary;
      this.meals = this.diaryService.meals;
    }
  }

  refreshData() {
    this.spinner.show();
    this.getDay();
  }

  getDay() {
    this.diaryService.getDay(this.day.date)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.summary = this.diaryService.summary;
        this.meals = this.diaryService.meals;
      }, (err) => {
        // TODO handle expired session
      });
  }
}
