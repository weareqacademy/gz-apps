"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password_hash').notNullable();
        table.string('name').notNullable();
        table.string('avatar');
        table.string('whatsapp');
        table.boolean('is_geek').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('users');
}
exports.down = down;
