'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.table('events', (table) => {      
      table.integer('category')
      table.string('objeto')
    })
  }

  down () {
    this.table('events', (table) => {      
      table.dropColumn('category')
      table.dropColumn('objeto')
    })
  }
}

module.exports = EventsSchema
