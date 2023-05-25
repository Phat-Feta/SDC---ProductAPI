COPY product FROM '/Users/yluo/Documents/hackreactor/SDC_Data/product.csv' DELIMITER ',' CSV HEADER;

COPY styles FROM '/Users/yluo/Documents/hackreactor/SDC_Data/styles.csv' DELIMITER ',' CSV HEADER;

COPY photos(photo_id, style_id, url, thumbnail_url) FROM '/Users/yluo/Documents/hackreactor/SDC_Data/photos.csv' DELIMITER ',' CSV HEADER;

COPY features FROM '/Users/yluo/Documents/hackreactor/SDC_Data/features.csv' DELIMITER ',' CSV HEADER;

COPY skus(skus_id, style_id, size, quantity) FROM '/Users/yluo/Documents/hackreactor/SDC_Data/skus.csv' DELIMITER ',' CSV HEADER;

COPY related(id, product_id, related_id) FROM '/Users/yluo/Documents/hackreactor/SDC_Data/related.csv' DELIMITER ',' CSV HEADER;

-- (product_id, name, slogan, description, category, default_price)
-- //(style_id, product_id, name, sale_price, original_price, isDefault)
-- (feature_id, product_id, feature, feature_value)