import { orchidORM } from 'orchid-orm';
import { dbConfig } from './config';
import { LoginLogsTable } from './schemas/loginLogs.table';
import { OgTable } from './schemas/ownergroup.table';
import { UserTable } from './schemas/user.table';


export const db = orchidORM(dbConfig.database, {
  loginLogs: LoginLogsTable,
  og: OgTable,
  user: UserTable,
});
