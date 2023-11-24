"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const customServer = http.createServer(async (customReq, customRes) => {
    if (customReq.url === '/scrape' && customReq.method === 'GET') {
        try {
            // URL to scrape
            const customUrl = 'https://www.wikidata.org/wiki/Q36153';
            // Send an HTTP request to the website
            const customResponse = await axios_1.default.get(customUrl);
            const customHtmlContent = customResponse.data;
            // Load the combined HTML content into Cheerio
            const $ = (0, cheerio_1.load)(customHtmlContent);
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
        }
        catch (customError) {
            console.error(`Error: ${customError.message}`);
            customRes.writeHead(500, { 'Content-Type': 'application/json' });
            customRes.end(JSON.stringify({ error: 'Internal server error' }));
        }
    }
    else {
        // Handle other routes or methods if needed
        customRes.writeHead(404, { 'Content-Type': 'text/plain' });
        customRes.end('Not Found');
    }
});
const customPort = 3001;
customServer.listen(customPort, () => {
    console.log(`Server is running on http://localhost:${customPort}/scrape`);
});
