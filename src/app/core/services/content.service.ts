import { computed, inject, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import type {
  BudgetRange,
  FAQCategory,
  Paginated,
  Post,
  PricingPlan,
  ProcessStep,
  Project,
  Service,
  ServiceCategory,
  Site,
  SkillGroup,
  Technology,
  Testimonial,
} from '../models/models';

/**
 * Read-only content store. Each resource is an httpResource signal that the
 * views consume reactively; data originates entirely from the backend/DB.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly apiUrl = environment.apiUrl;

  private readonly url = (path: string) => `${environment.apiUrl}${path}`;

  readonly site = httpResource<Site>(() => this.url('/site/'));
  readonly services = httpResource<Paginated<Service>>(() => this.url('/services/'));
  readonly categories = httpResource<ServiceCategory[]>(() => this.url('/services/categories/'));
  readonly technologies = httpResource<Technology[]>(() => this.url('/technologies/'));
  readonly pricing = httpResource<PricingPlan[]>(() => this.url('/pricing/'));
  readonly process = httpResource<ProcessStep[]>(() => this.url('/process/'));
  readonly projects = httpResource<Paginated<Project>>(() => this.url('/projects/'));
  readonly testimonials = httpResource<Testimonial[]>(() => this.url('/testimonials/'));
  readonly skills = httpResource<SkillGroup[]>(() => this.url('/skills/'));
  readonly faq = httpResource<FAQCategory[]>(() => this.url('/faq/'));
  readonly blog = httpResource<Paginated<Post>>(() => this.url('/blog/'));
  readonly budgets = httpResource<BudgetRange[]>(() => this.url('/requests/budgets/'));

  readonly servicesList = computed(() => this.services.value()?.results ?? []);
  readonly projectsList = computed(() => this.projects.value()?.results ?? []);
  readonly postsList = computed(() => this.blog.value()?.results ?? []);

  readonly featuredServices = computed(() => this.servicesList().filter((s) => s.is_featured));
  readonly featuredProjects = computed(() => this.projectsList().filter((p) => p.is_featured));
}
