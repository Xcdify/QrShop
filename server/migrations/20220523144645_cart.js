/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async knex => {
    await knex.schema.createTable('carts', tbl =>{
        tbl.increments();
        tbl.integer('subtotal');
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = async knex => {
    await knex.schema.dropTableIfExists('carts');
  };
  
