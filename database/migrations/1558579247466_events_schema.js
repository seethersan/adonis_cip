'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('description')
      table.integer('user_id')
      table.string('almevnt')
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
