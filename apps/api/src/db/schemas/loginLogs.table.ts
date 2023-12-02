import { BaseTable } from "../baseTable";
import { OgTable } from "./ownergroup.table";
import { UserTable } from "./user.table";

export class LoginLogsTable extends BaseTable {
  readonly table = 'login_logs';
  columns = this.setColumns((t) => ({
    browser_name: t.text().nullable(),
    browser_version: t.text().nullable(),
    cpu_architecture: t.text().nullable(),
    device_model: t.text().nullable(),
    device_type: t.text().nullable(),
    device_vendor: t.text().nullable(),
    engine_name: t.text().nullable(),
    engine_version: t.text().nullable(),
    id: t.identity().primaryKey(),
    ip_address: t.text().nullable(),
    os_name: t.text().nullable(),
    os_version: t.text().nullable(),
    ua: t.text().nullable(),
    
    // relations
    og_handle: t.string().foreignKey(() => OgTable, 'id', {
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    }),
    user_id: t.integer().foreignKey(() => UserTable, 'id', { 
      onUpdate: 'CASCADE', 
      onDelete: 'NO ACTION'
    }),
  
    //defaults
    status: t.enum('status', ["Active"]).default('Active'),
    createdAt: t.timestamps().createdAt,
  }));
};