/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async knex => {
    await knex.schema.createTable('products', tbl =>{
        tbl.increments();
        tbl.text('prodName');
        tbl.text('prodDesc');
        tbl.text('price');
        tbl.text('prodImg');
        tbl.number('inventory');
        tbl.text('prodCat');
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = async knex => {
    await knex.schema.dropTableIfExists('products');
  };
  
