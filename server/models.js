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
  const stylesQueryStr = `SELECT * FROM styles WHERE product_id=${id};`;
  return pool.query(stylesQueryStr);
    // .then((dbRes) => {
    //   return dbRes.rows;
    // })
    // .catch((err) => {
    //   console.log(err, 'Failed to get style_id');
    // });
};

const getRelatedProFromDB = (id) => {
  const relatedQueryStr = `SELECT related_id FROM related WHERE product_id=${id};`;
  return pool.query(relatedQueryStr);
};

module.exports = {getProductsFromDB, getProductDetailsFromDB, getStylesByIdFromDB, getRelatedProFromDB};