/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async knex => {
    await knex.schema.createTable('cart_products', tbl => {
        tbl.integer('cartId');
        tbl.integer('productId');
        tbl.integer('price');
        tbl.integer('quantity');
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = async knex => {
    await knex.schema.dropTableIfExists('cart_products');
  };
  
