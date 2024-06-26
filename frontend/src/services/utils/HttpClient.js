import { APIError } from '../../erros/APIError';
import { delay } from '../../utils/delay';

export class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  post(path, body) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
    });
  }

  put(path, body) {
    return this.makeRequest(path, {
      method: 'PUT',
      body,
    });
  }

  delete(path) {
    return this.makeRequest(path, {
      method: 'DELETE',
    });
  }

  async makeRequest(path, options) {
    await delay(500);

    const headers = new Headers();

    if (options?.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options?.body),
      headers,
      signal: options.signal,
    });

    let responseBody = null;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}
