export class SimulatedHttpError extends Error {
  status: number;
  statusText: string;
  url?: string;
  error?: any;

  constructor(message: string, status: number, statusText: string, url?: string, error?: any) {
    super(message);
    this.name = 'SimulatedHttpError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.error = error;
  }
}