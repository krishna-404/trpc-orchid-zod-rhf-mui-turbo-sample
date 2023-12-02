import { BaseTable } from "../baseTable";
import { db } from "../db";
import { UserTable } from "./user.table";

export class OgTable extends BaseTable {
  readonly table = 'ownergroup';
  columns = this.setColumns((t) => ({
    id: t.integer().primaryKey(),
    name: t.string(),

    //defaults
    status: t.enum('status', ["Active"]).default('Active'),
    ...t.timestamps()
  }));

  relations = {
    users: this.hasMany(() => UserTable, {
      required: false,
      columns: ['id'],
      references: ['og_handle']
    })
  };

  init(orm: typeof db) {
    // `before` hooks don't receive data, only a query object
    this.beforeQuery((q) => console.log('before any query'));
    this.beforeCreate((q) => console.log('before create'));
    this.beforeUpdate((q) => console.log('before update'));
    this.beforeSave((q) => console.log('before create or update'));
    this.beforeDelete((q) => console.log('before delete'));
  };
};