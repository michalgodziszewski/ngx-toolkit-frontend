import { Injectable } from '@angular/core';
import { MockRoute } from './mock-types';

@Injectable({ providedIn: 'root' })
export class MockRegistry {
  private routes: MockRoute[] = [];

  registerRoutes(routes: MockRoute[]) {
    this.routes.push(...routes);
  }

  getRoutes(): MockRoute[] {
    return this.routes;
  }
}
