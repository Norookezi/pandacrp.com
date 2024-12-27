import { Routes } from '../route';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    priority: 1,
    changefreq: 'weekly',
    index: true,
  },
  { path: '**', redirectTo: '' },
];
