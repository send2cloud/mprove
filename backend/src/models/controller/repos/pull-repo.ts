import { Request, Response } from 'express';
import { api } from '../../../barrels/api';
import { entities } from '../../../barrels/entities';
import { enums } from '../../../barrels/enums';
import { git } from '../../../barrels/git';
import { helper } from '../../../barrels/helper';
import { interfaces } from '../../../barrels/interfaces';
import { proc } from '../../../barrels/proc';
import { sender } from '../../../barrels/sender';
import { store } from '../../../barrels/store';
import { validator } from '../../../barrels/validator';
import { wrapper } from '../../../barrels/wrapper';
import { ServerError } from '../../server-error';

export async function pullRepo(req: Request, res: Response) {
  let initId = validator.getRequestInfoInitId(req);

  let userId: string = req.user.email;

  let payload: api.PullRepoRequestBody['payload'] = validator.getPayload(req);

  let projectId = payload.project_id;
  let repoId = payload.repo_id;
  let serverTs = payload.server_ts;

  let storeRepos = store.getReposRepo();

  let devRepo = <entities.RepoEntity>await storeRepos
    .findOne({
      project_id: projectId,
      repo_id: repoId
    })
    .catch(e => helper.reThrow(e, enums.storeErrorsEnum.STORE_REPOS_FIND_ONE));

  if (!devRepo) {
    throw new ServerError({ name: enums.otherErrorsEnum.REPO_NOT_FOUND });
  }

  helper.checkServerTs(devRepo, serverTs);

  // pull production (central) to dev

  await git
    .fetchOrigin({
      project_id: projectId,
      repo_id: repoId
    })
    .catch(e => helper.reThrow(e, enums.gitErrorsEnum.GIT_FETCH_ORIGIN));

  await git
    .mergeCommitsOriginToLocal({
      project_id: projectId,
      repo_id: repoId,
      user_id: userId
    })
    .catch(e =>
      helper.reThrow(e, enums.gitErrorsEnum.GIT_MERGE_COMMITS_ORIGIN_TO_LOCAL)
    );

  // process changes

  let itemChanges = <interfaces.ItemProcessDevRepoChanges>await proc
    .processDevRepoChanges({
      project_id: projectId,
      repo_id: repoId,
      dev_repo: devRepo,
      init_id: initId
    })
    .catch(e =>
      helper.reThrow(e, enums.procErrorsEnum.PROC_PROCESS_DEV_REPO_CHANGES)
    );

  // response

  let responsePayload: api.PullRepoResponse200Body['payload'] = {
    deleted_dev_files: itemChanges.deleted_dev_files.map(file =>
      wrapper.wrapToApiFile(file)
    ),
    changed_dev_files: itemChanges.changed_dev_files.map(file =>
      wrapper.wrapToApiFile(file)
    ),
    new_dev_files: itemChanges.new_dev_files.map(file =>
      wrapper.wrapToApiFile(file)
    ),
    dev_struct_or_empty: [
      {
        errors: itemChanges.errors.map(error => wrapper.wrapToApiError(error)),
        models: itemChanges.models.map(model => wrapper.wrapToApiModel(model)),
        dashboards: itemChanges.dashboards.map(dashboard =>
          wrapper.wrapToApiDashboard(dashboard)
        ),
        repo: wrapper.wrapToApiRepo(itemChanges.dev_repo)
      }
    ]
  };

  sender.sendClientResponse(req, res, responsePayload);
}
