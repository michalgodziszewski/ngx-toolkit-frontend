import { InjectionToken } from '@angular/core';

export interface MockConfig {
  useMock: boolean;
  delay: number;
  stripApiPrefix?: boolean;
}

export const MOCK_CONFIG = new InjectionToken<MockConfig>('MOCK_CONFIG');
