import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsComponent } from './search-results/search-results.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { FoodComponent } from './food/food.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CalculatorComponent } from './calculator/calculator.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: 'calculator',
        component: CalculatorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile/:username',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'food/:name',
        pathMatch: 'prefix',
        component: FoodComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'setgoal',
        component: AddGoalComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search/:query',
        component: SearchResultsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutingModule { }
