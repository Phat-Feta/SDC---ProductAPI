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
  const stylesQueryStr = `
  SELECT
    s.*,
    (
      SELECT json_agg(
        json_build_object(
          'thumbnail_url', p.thumbnail_url,
          'url', p.url
        )
      )
      FROM photos p
      WHERE p.style_id = s.style_id
    ) AS photos,
    json_object_agg(
      skus.skus_id,
      json_build_object(
        'quantity', skus.quantity,
        'size', skus.size
      )
    ) AS skus
  FROM styles s
    JOIN skus ON s.style_id = skus.style_id
  WHERE s.product_id=${id}
  GROUP BY s.style_id
  ORDER BY s.style_id ASC;`;
  return pool.query(stylesQueryStr);
};

const getRelatedProFromDB = (id) => {
  const relatedQueryStr = `SELECT related_id FROM related WHERE product_id=${id};`;
  return pool.query(relatedQueryStr);
};

module.exports = {getProductsFromDB, getProductDetailsFromDB, getStylesByIdFromDB, getRelatedProFromDB};