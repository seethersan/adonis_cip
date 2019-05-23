'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlmevntSchema extends Schema {
  up () {
    this.table('almevnts', (table) => {
      // alter table
    })
  }

  down () {
    this.table('almevnts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlmevntSchema
