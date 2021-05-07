export interface Conversion {
  disclaimer: string;
  license: string;
  request: {
    query: string;
    amount: number;
    from: string;
    to: string;
  };
  meta: {
    timestamp: number;
    rate: number;
  };
  response: number;
}
