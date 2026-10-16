import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Главная',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'services',
    title: 'Услуги и цены',
    loadComponent: () => import('./features/services/services.component').then((m) => m.ServicesComponent),
  },
  {
    path: 'services/:slug',
    loadComponent: () => import('./features/services/service-detail.component').then((m) => m.ServiceDetailComponent),
  },
  {
    path: 'projects',
    title: 'Проекты',
    loadComponent: () => import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./features/projects/project-detail.component').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'about',
    title: 'Обо мне',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'blog',
    title: 'Блог',
    loadComponent: () => import('./features/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/post-detail.component').then((m) => m.PostDetailComponent),
  },
  {
    path: 'faq',
    title: 'Вопросы и ответы',
    loadComponent: () => import('./features/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'contact',
    title: 'Контакты',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
