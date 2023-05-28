const request = require('supertest');
const app = require('./app.js');

describe('GET "/products"', () => {
  test('get a list of 5 products information if no page or count specified, meaning default count = 5', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(200);
    expect(res._body.length).toBe(5);
  });

  test("get a list of 10 products information and first product's id is 1 if count is 10 and page is 1", async () => {
    const res = await request(app).get('/products?page=1&count=10')
    expect(res.statusCode).toEqual(200);
    expect(res._body.length).toBe(10);
    expect(res._body[0].id).toEqual(1);
    expect(res._body[0].name).toEqual('Camo Onesie');
  });
});

describe('GET "/products/:product_id"', () => {
  test(`response's id should be same as request product id`, async () => {
    const res = await request(app).get('/products/:product_id?product_id=964200')
    expect(res.statusCode).toEqual(200);
    expect(res._body.id).toBe(964200);
  });

  test("should return the following information about the product: id, campus, name, slogan, description, category, default_price and features", async () => {
    const res = await request(app).get('/products/:product_id?product_id=964200')
    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res._body)).toEqual(['name', 'slogan', 'description', 'category', 'default_price', 'campus', 'id', 'features']);
  });

  test("should respond feature and value pairs for the searched product", async () => {
    const res = await request(app).get('/products/:product_id?product_id=964200')
    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res._body.features[0])).toEqual(['feature', 'value']);
  });
});