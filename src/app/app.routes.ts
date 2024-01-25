import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        canActivate: [AdminGuard],
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((c) => c.UsersComponent),
      },
      {
        path: 'group',
        loadComponent: () =>
          import('./groups/groups.component').then((c) => c.GroupsComponent),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./chat/chat.component').then((c) => c.ChatComponent),
      },
    ],
  },
];
