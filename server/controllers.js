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
  getStylesByIdFromDB(req.query.product_id)
    .then((dbRes) => {
      let result ={
        product_id: String(req.query.product_id),
        results: [],
      }
      dbRes.rows.forEach((style) => {
        let updatedStyle = {
          style_id: style.style_id,
          name: style.name,
          original_price: String(style.original_price),
          sale_price: String(style.sale_price),
          'default?': style.isDefault === 1 ? true : false,
          photos: style.photos,
          skus: style.skus,
        }
        result.results.push(updatedStyle);
      });
      res.status(200).send(result);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
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