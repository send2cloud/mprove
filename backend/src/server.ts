import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions
} from 'typeorm';

import { config } from './barrels/config';
import { constants } from './barrels/constants';
import { credentials } from './barrels/credentials';
import { enums } from './barrels/enums';
import { helper } from './barrels/helper';
import { disk } from './barrels/disk';
import { handler } from './barrels/handler';
import { scheduler } from './barrels/scheduler';
import { start } from './barrels/start';

import { createExpress } from './create-express';

// import {
//   config.DB_TYPE,
//   config.DB_HOST,
//   config.DB_PORT,
//   config.DB_USERNAME,
//   config.DB_PASSWORD,
//   config.DB_DATABASE
// } from './configs/config';

run().catch(e => {
  handler.errorToLog(e);
});

async function run() {
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions = <ConnectionOptions>(
    await getConnectionOptions().catch(e =>
      helper.reThrow(e, enums.typeormErrorsEnum.TYPEORM_GET_CONNECTION_OPTIONS)
    )
  );

  Object.assign(connectionOptions, {
    // synchronize: true, // TODO: #28-1 synchronize: false in prod
    //   type: config.DB_TYPE,
    //   host: config.DB_HOST,
    //   port: config.DB_PORT,
    //   username: config.DB_USERNAME,
    password: process.env.BACKEND_DATABASE_ROOT_PASSWORD,
    database: process.env.BACKEND_DATABASE,
    entities: [__dirname + '/models/store/entities/*.js'],
    // entities: [
    //   DashboardEntity,
    //   ErrorEntity,
    //   FileEntity,
    //   MconfigEntity,
    //   MemberEntity,
    //   ModelEntity,
    //   ProjectEntity,
    //   QueryEntity,
    //   RepoEntity,
    //   SessionEntity,
    //   UserEntity,
    // ],
    migrations: [__dirname + '/migration/*.js']
    // migrations: ['src/migration/*.js'],
    //   cli: {
    //     migrationsDir: 'src/migration'
    //   }
  });

  // create connection with database
  // note that it's not active database connection
  // TypeORM creates connection pools and uses them for your requests
  const connection = <Connection>(
    await createConnection(connectionOptions).catch(e =>
      helper.reThrow(e, enums.typeormErrorsEnum.TYPEORM_CREATE_CONNECTION)
    )
  );

  await connection
    .dropDatabase() // TODO: #28-2 remove synchronize in prod
    .catch(e =>
      helper.reThrow(
        e,
        enums.typeormErrorsEnum.TYPEORM_CONNECTION_DROP_DATABASE
      )
    );

  await connection
    .synchronize() // TODO: #28-3 remove synchronize in prod
    .catch(e => helper.reThrow(e, enums.typeormErrorsEnum.TYPEORM_SYNCHRONIZE));

  // await connection.runMigrations() // TODO: #28-4 runMigrations in prod
  //   .catch(e => helper.reThrow(e, enums.typeormErrorsEnum.TYPEORM_RUN_MIGRATIONS));

  await disk
    .emptyDir(config.DISK_BASE_PATH)
    .catch(e => helper.reThrow(e, enums.diskErrorsEnum.DISK_EMPTY_DIR));

  await disk
    .emptyDir(config.DISK_BIGQUERY_CREDENTIALS_PATH)
    .catch(e => helper.reThrow(e, enums.diskErrorsEnum.DISK_EMPTY_DIR));

  await start
    .addUsers()
    .catch(e => helper.reThrow(e, enums.startErrorsEnum.START_ADD_USERS));

  let adminMemberIds = config.admins.map(admin => admin.user_id);

  await start
    .addProject({
      project_id: constants.DEMO_PROJECT,
      bigquery_credentials: credentials.bigqueryMproveDemo,
      member_ids: adminMemberIds
    })
    .catch(e => helper.reThrow(e, enums.startErrorsEnum.START_ADD_PROJECT));

  await start
    .addProject({
      project_id: constants.PROJECT_WOOD,
      bigquery_credentials: credentials.bigqueryMproveDemo,
      member_ids: adminMemberIds
    })
    .catch(e => helper.reThrow(e, enums.startErrorsEnum.START_ADD_PROJECT));

  let itemCreateExpress = createExpress();

  scheduler.runScheduler({ ws_clients: itemCreateExpress.ws_clients });
}
