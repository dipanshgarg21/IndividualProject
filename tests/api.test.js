const axios = require('axios');
API_URL="http://localhost:5000/api"

describe('API Tests', () => {
    // Test the GET /api/devices endpoint
    describe('GET /api/devices', () => {
      it('should return an array of devices', async () => {
        const response = await axios.get(`${API_URL}/devices`);
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
      });
    });
    describe('GET /api/lightDevices', () => {
        it('should return an array of items', async () => {
      
          const response = await axios.post(`${API_URL}/lightDevices`);
          expect(response.status).toBe(200);
          expect(response.data).toBeInstanceOf(Array);
        });
      });
  });  