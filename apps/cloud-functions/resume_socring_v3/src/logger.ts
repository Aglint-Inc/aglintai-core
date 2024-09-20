import { Log, Logging } from "@google-cloud/logging";
import { LogEntry } from "@google-cloud/logging/build/src/entry";

// let loggerClient: Log | null = null;

type LoggerDataType = {
  timestamp?: string;
  function?: string;
  subProcess?: string;
  application_id?: string;
  company?: string;
  job_id?: string;
  status: string;
  error?: string;
};

export default class LoggerV2 extends Logging {
  private _metadata: LogEntry;
  private _data: LoggerDataType;
  private _logger: Log;
  loggerDetails: { [key: string]: string } = { application_id: "not set yet" };
  // private _logs: Entry[] = [];
  constructor(name: string, meta: LogEntry, data: LoggerDataType) {
    super();
    this._logger = super.log(name);
    this._metadata = meta;
    this._data = data;
  }
  get metadata() {
    return this._metadata;
  }
  setSupProcess(name: string) {
    this._data.subProcess = name;
  }
  async createLog(
    logData: {
      message?: string;
      subProcess?: string;
      error?: string;
    },
    options?: {
      severity?: LogEntry["severity"];
    }
  ) {
    if (logData.error) {
      options = { ...options, severity: "ERROR" };
    }
    const temp = this._logger.entry(
      { ...this._metadata, ...options },
      {
        ...this._data,
        ...logData,
      }
    );
    await this._logger.write(temp).catch((error: any) => {
      console.error(error);
    });
    // this._logs.push(temp);
  }
}
// async end() {
//   if (!this._logger) throw new Error("logger not initialized");
//   // console.log(this._logs);
//   await this._logger.write(this._logs).catch((error) => {
//     console.error(error);
//   });
// }
// }

// export const createLogger = (
//   name: string,
//   meta: LogEntry,
//   data: LoggerDataType
// ) => {
//   return new LoggerV2(name, meta, data);
// };
