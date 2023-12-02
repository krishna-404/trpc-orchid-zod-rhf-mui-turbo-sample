import { z } from "zod";
import { BaseTable } from "../baseTable";
import { db } from "../db";
import { OgTable } from "./ownergroup.table";

export class UserTable extends BaseTable {
  readonly table = 'user';
  columns = this.setColumns((t) => ({
    email: t.text().unique().nullable(),
    id: t.identity().primaryKey(),
    mobile_numer: t.bigint().nullable().parse((input) => input && parseInt(input)),
    name: t.text(),
    password: t.text(),
    role: t.text().default('Maintainer').asType((t) => t<'Admin' | 'Owner' | 'Maintainer'>()),
    short_name: t.text(),

    //relations
    og_handle: t.text().nullable().foreignKey(() => OgTable, 'id', {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }),

    //defaults
    status: t.enum('status', ["Active"]).default('Active'),
    ...t.timestamps()
  }));

  init(orm: typeof db) {
    // select `id` and `name` for the after-create hook
    this.afterCreateCommit(['id', 'name'], (data, q) => {
      // data is an array of records
      for (const record of data) {
        // `id` and `name` are guaranteed to be loaded
        console.log(`Record with id ${record.id} has name ${record.name}.`);
      }
    });

    this.afterUpdateCommit(['id', 'name'], (data, q) =>
      console.log(`${data.length} records were updated`),
    );

    // run after creating and after updating
    this.afterSaveCommit(['id', 'name'], (data, q) =>
      console.log(`${data.length} records were created or updated`),
    );

    this.afterDeleteCommit(['id', 'name'], (data, q) =>
      console.log(`${data.length} records were deleted`),
    );
  };
};

const userInsertZod = UserTable.schema();

type UserType = z.infer<typeof userInsertZod>;