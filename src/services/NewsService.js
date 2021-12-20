/**
 * Base class for all services.
 * This class is used to encapsulate common API interaction in a single class,
 * */
export default class NewsService {
  #endpointUrl;

  /**
   * Creates an instance of the RestService.
   * @param {string} endpoint - The resource URI for the class that extends
   * this class.
   */
  constructor(endpoint = 'everything') {
    this.#endpointUrl = `https://newsapi.org/v2/${endpoint}?apiKey=${process.env.NEWS_API_KEY}`;
  }

  /**
   * Get all resources from the API.
   * @param {string} query - The query to get resources from the API.
   */
  async getArticles(query = '') {
    const url = `${this.#endpointUrl}&pageSize=100&q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'error') {
      throw new Error(data.code);
    }
    return data;
  }
}
