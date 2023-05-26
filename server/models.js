const pool = require('../database/pgConnection.js');

const getProductsFromDB = (id) => {

};

const getProductDetailsFromDB = (id) => {
  const productQueryStr = `SELECT name, slogan, description, category, default_price FROM product WHERE product_id=${id};`;
  const featuresQueryStr = `SELECT feature, feature_value FROM features WHERE product_id=${id};`;
  const productPromise = pool.query(productQueryStr);
  const featuresPromise = pool.query(featuresQueryStr);
  return Promise.all([productPromise, featuresPromise]);
};

const getStylesByIdFromDB = (id) => {
  const stylesQueryStr = `SELECT style_id, name, original_price, sale_price, isDefault FROM styles WHERE product_id=${id};`;
  pool.query(stylesQueryStr)
    .then(() => {

    })
    .catch((err) => {
      console.log(err, 'Failed to get style_id');
    });
  const photosQueryStr = `SELECT url, thumbnail_url FROM photos WHERE style_id=${style_id};`;
  const skusQueryStr = `SELECT size, quantity FROM skus WHERE style_id=${style_id};`;
  const productPromise = pool.query(productQueryStr);
  const featuresPromise = pool.query(featuresQueryStr);
  return Promise.all([productPromise, featuresPromise]);
};

const getRelatedProFromDB = (id) => {
  const relatedQueryStr = `SELECT related_id FROM related WHERE product_id=${id};`;
  return pool.query(relatedQueryStr);
};

module.exports = {getProductsFromDB, getProductDetailsFromDB, getStylesByIdFromDB, getRelatedProFromDB};