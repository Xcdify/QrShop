// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/database.db3'
    },
    // migrations are where we decalre what columns we want & what type of datas they are gonna take (Added So i dont forget xD)
    migrations: {
      directory: './server/migrations'
    },

    seeds: {
      directory: './server/seeds'
    },
    useNullAsDefault: true,

  },


};
