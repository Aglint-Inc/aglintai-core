import { DatabaseTableInsert } from '@aglint/shared-types';

import { supabase } from '../supabase/client';

export class AglintLogger {
  private static globalLogLevel = process.env.NEXT_PUBLIC_LOG_LEVEL as
    | 'info'
    | 'error'
    | 'debug'
    | 'debug-only';
  private static globalLogDetailsLevel = process.env
    .NEXT_PUBLIC_LOG_DETAILS_LEVEL as 'anonymous' | 'basic' | 'full';
  private logDetails: DatabaseTableInsert['logs'];
  private level: typeof AglintLogger.globalLogLevel;
  private logDetailsLevel: typeof AglintLogger.globalLogDetailsLevel;
  constructor(
    {
      name,
      recruiter_id,
      type,
      user_id,
    }: {
      name: string;
      recruiter_id: string;
      user_id: string;
      type: 'api' | 'function';
    },
    options?: {
      level?: typeof AglintLogger.globalLogLevel;
      detailsLevel?: typeof AglintLogger.globalLogDetailsLevel;
    },
  ) {
    this.logDetails = {
      name: name,
      recruiter_id: recruiter_id,
      user_id: user_id,
      status: 'process',
      type,
    };
    this.level = options?.level || AglintLogger.globalLogLevel;
    this.logDetailsLevel =
      options?.detailsLevel || AglintLogger.globalLogDetailsLevel || 'basic';
  }
  static setGlobalLogLevel = (level: typeof AglintLogger.globalLogLevel) => {
    AglintLogger.globalLogLevel = level;
    return true;
  };
  static checkGlobalLogLevel = () => {
    return AglintLogger.globalLogLevel;
  };
  static setGlobalLogDetailsLevel = (
    level: typeof AglintLogger.globalLogDetailsLevel,
  ) => {
    AglintLogger.globalLogDetailsLevel = level;
    return true;
  };

  async error({
    status,
    message,
    meta,
  }: Pick<DatabaseTableInsert['logs'], 'message' | 'meta'> & {
    status?: DatabaseTableInsert['logs']['status'];
  }) {
    await this.log({
      status,
      message,
      meta,
    });
  }
  async info({
    status,
    message,
    meta,
  }: Pick<DatabaseTableInsert['logs'], 'message' | 'meta'> & {
    status?: DatabaseTableInsert['logs']['status'];
  }) {
    status;
    !['error', 'debug-only'].includes(this.level) &&
      (await this.log({
        status,
        message,
        meta,
      }));
  }

  async debug({
    status,
    message,
    meta,
  }: Pick<DatabaseTableInsert['logs'], 'message' | 'meta'> & {
    status?: DatabaseTableInsert['logs']['status'];
  }) {
    ['debug', 'debug-only'].includes(this.level) &&
      (await this.log({
        status,
        message,
        meta,
      }));
  }

  private async log({
    status,
    message,
    meta,
  }: Pick<DatabaseTableInsert['logs'], 'message' | 'meta' | 'status'>) {
    const details: DatabaseTableInsert['logs'] = {
      name: this.logDetails.name,
      type: 'api',
      status: status || this.logDetails.status,
      recruiter_id: this.logDetails.recruiter_id,
      parent_log_id: this.logDetails.parent_log_id,
      meta: {
        ...this.logDetails.meta,
        payload: undefined,
        response: undefined,
        ...meta,
      },
    };

    switch (this.logDetailsLevel) {
      case 'full':
        details.meta = {
          ...details.meta,
          ...this.logDetails.meta,
        };
      // eslint-disable-next-line no-fallthrough
      case 'basic':
        details.user_id = this.logDetails.user_id;
        break;
      default:
        break;
    }
    // console.log(meta);
    return await this.logToDB(
      { ...details, message },
      !this.logDetails.parent_log_id && this.level != 'error',
    );
  }

  private async logToDB(
    data: DatabaseTableInsert['logs'],
    getId: boolean = false,
  ) {
    const query = supabase.from('logs').insert(data);
    if (getId) {
      this.logDetails.parent_log_id = (
        await query.select('id').single().throwOnError()
      ).data.id;
      return;
    }
    await query.throwOnError();
    return;
  }
}
