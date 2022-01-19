/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unique;
        table.string('username').unique;
        table.string('password');
    })
        .then(() => {
            return knex.schema.createTable('lists', (table) => {
                table.increments('id')
                table.integer('users_id').unsigned();
                table.foreign('users_id').references('users.id');
                table.string('todolists');
                table.boolean('tasksDone').defaultTo(false)
            })
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users').then(() => {
        return knex.schema.dropTable('lists')
    })

};
