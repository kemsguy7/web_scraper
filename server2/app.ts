import * as http from 'http';
import axios from 'axios';
import { load } from 'cheerio';

const customServer = http.createServer(async (customReq, customRes) => {
  if (customReq.url === '/scrape' && customReq.method === 'GET') {
    try {
      // URL to scrape
      const customUrl = 'https://www.wikidata.org/wiki/Q36153';

      // Send an HTTP request to the website
      const customResponse = await axios.get(customUrl);
      const customHtmlContent = customResponse.data;

      // Load the combined HTML content into Cheerio
      const $ = load(customHtmlContent);

      // Log all meta tags to the console for inspection/debugging
      $('meta').each((index, element) => {
        console.log($(element).attr('property') || $(element).attr('name'));
      });

      // Extract metadata
      const customTitle = $('head title').text();
      const customDescription = $('meta[name="description"]').attr('content');
      const customImageUrl = $('meta[property="og:image"]').attr('content');

      // Log the extracted data to the console
      console.log({ customTitle, customDescription, customImageUrl });

      // Respond with the extracted metadata
      customRes.writeHead(200, { 'Content-Type': 'application/json' });
      customRes.end(JSON.stringify({ customTitle, customDescription, customImageUrl }));
    } catch (customError: any) {
      console.error(`Error: ${customError.message}`);
      customRes.writeHead(500, { 'Content-Type': 'application/json' });
      customRes.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    // Handle other routes or methods if needed
    customRes.writeHead(404, { 'Content-Type': 'text/plain' });
    customRes.end('Not Found');
  }
});

const customPort = 3001;
customServer.listen(customPort, () => {
  console.log(`Server is running on http://localhost:${customPort}/scrape`);
});
