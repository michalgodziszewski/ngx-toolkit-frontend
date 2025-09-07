import { Observable } from 'rxjs';

export type MockResult =
  | any
  | { status?: number; headers?: Record<string, string>; body?: any };

export type MockContext = {
  url: string;
  endpoint: string;
  method: string;
  params: Record<string, any>;
  body: any;
  match?: RegExpMatchArray;
};

export type MockHandler = (
  ctx: MockContext,
) => MockResult | Promise<MockResult> | Observable<MockResult>;

export interface MockRoute {
  method?: string;
  pattern: RegExp;
  handler: MockHandler;
}
