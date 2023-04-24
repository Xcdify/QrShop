/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async knex => {
    await knex.schema.createTable('orders', tbl =>{
        tbl.increments();
        tbl.text('name');
        tbl.text('code');
        tbl.text('adress');
        tbl.text('number');
        tbl.text('products');
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = async knex => {
    await knex.schema.dropTableIfExists('orders');
  };
  
