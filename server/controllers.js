const {getProductsFromDB, getProductDetailsFromDB, getStylesByIdFromDB, getRelatedProFromDB} = require('./models.js');

const getProducts = (req, res) => {

};

const getProductById = (req, res) => {
  getProductDetailsFromDB(req.query.product_id)
    .then((dbRes) => {
      const productInfo = dbRes[0].rows[0];
      const featureInfo = dbRes[1].rows;
      const defaultPrice = productInfo['default_price'];
      productInfo['id'] = Number(req.query.product_id);
      productInfo['default_price'] = String(defaultPrice);
      productInfo['features'] = featureInfo;
      res.status(200).send(productInfo);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

const getStylesById = (req, res) => {
  // console.log(req.query.product_id)
  // getStylesByIdFromDB(req.query.product_id)
  //   .then((dbRes) => {
  //     // console.log(dbRes.rows);
  //     let dataPromised = dbRes.rows.map((style) => {
  //       // console.log(style);
  //       // const photosQueryStr = `SELECT url, thumbnail_url FROM photos WHERE style_id=${style.style_id};`;
  //       // const skusQueryStr = `SELECT size, quantity FROM skus WHERE style_id=${style.style_id};`;
  //       const queryStr = `SELECT size, quantity, url, thumbnail_url FROM skus INNER JOIN photos on skus.style_id=photos.style_id WHERE photos.style_id=${style.style_id};`;
  //       console.log(queryStr);
  //       return pool.query(queryStr);
  //       // const skusPromise = pool.query(skusQueryStr);
  //     });
  //     console.log(typeof dataPromised)
  //     return Promise.all(dataPromised);
  //   })
  //   .then((dbRes) => {
  //     console.log(dbRes);
  //     res.status(200).send();

  //   })
  //   .catch((err) => {
  //     res.sendStatus(404);
  //   });
};

const getRelatedPro = (req, res) => {
  getRelatedProFromDB(req.query.product_id)
    .then((dbRes) => {
      const relatedArr = [];
      dbRes.rows.forEach((relatedObj) => {
        relatedArr.push(relatedObj.related_id);
      });
      res.status(200).send(relatedArr);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

module.exports = {getProducts, getProductById, getStylesById, getRelatedPro};