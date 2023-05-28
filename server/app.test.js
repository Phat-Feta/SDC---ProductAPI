const request = require('supertest');
const app = require('./app.js');

beforeAll(done => {
  done();
});

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

  // test('should respond 404 when page and count are out of bound', async () => {
  //   const res = await request(app).get('/products?page=500333&count=10000')
  //   expect(res.statusCode).toEqual(404);
  // });
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

  test("should respond the correct product name, category, slogan and default_price", async () => {
    const res = await request(app).get('/products/:product_id?product_id=2')
    expect(res.statusCode).toEqual(200);
    expect(res._body.name).toEqual('Bright Future Sunglasses');
    expect(res._body.category).toEqual('Accessories');
    expect(res._body.slogan).toEqual("You've got to wear shades");
    expect(res._body.default_price).toEqual('69');
  });
});

describe('GET "/products/:product_id/styles"', () => {
  test('should respond the same product id', async () => {
    const res = await request(app).get('/products/:product_id/styles?product_id=964208')
    expect(res.statusCode).toEqual(200);
    expect(Number(res._body.product_id)).toBe(964208);
  });

  test("should respond style_id, name, original_price, sale_price, default?, photos, and skus information for each style", async () => {
    const res = await request(app).get('/products/:product_id/styles?product_id=964208')
    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res._body.results[0])).toEqual(['style_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'skus']);
  });

  test('should respond 5 styles with product id 1000011', async () => {
    const res = await request(app).get('/products/:product_id/styles?product_id=1000011')
    expect(res.statusCode).toEqual(200);
    expect(res._body.results.length).toBe(5);
  });
});

describe('GET "/products/:product_id/related"', () => {
  test('should respond a list of 6 product ids related to the specified id', async () => {
    const res = await request(app).get('/products/:product_id/related?product_id=1000011')
    expect(res.statusCode).toEqual(200);
    expect(res._body.length).toBe(6);
  });

  test('should respond ids 665100, 574060 and 766058 with product id 1000007', async () => {
    const res = await request(app).get('/products/:product_id/related?product_id=1000007')
    expect(res.statusCode).toEqual(200);
    expect(res._body).toEqual([766058, 574060, 665100]);
  });

  // test("should respond status code 404 when product id is not present in DB", async () => {
  //   const res = await request(app).get('/products/:product_id/related?product_id=1000013')
  //   expect(res.statusCode).toEqual(404);
  // });
});

afterAll(done => {
  // client.end();
  done();
});