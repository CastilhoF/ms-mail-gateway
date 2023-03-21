import { utilities } from 'nest-winston';
import * as winston from 'winston';
import {
  ConsoleTransportInstance,
  ConsoleTransportOptions,
  FileTransportInstance,
  FileTransportOptions,
} from 'winston/lib/winston/transports';
import * as path from 'path';

const { transports } = winston;
const { Console } = transports;
const DIR_PATH = path.join(__dirname, './../../../../logs/');

const consoleOptions: ConsoleTransportOptions = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.splat(),
    winston.format.errors(),
    utilities.format.nestLike('ms-mail-gateway', {
      prettyPrint: true,
      colors: true,
    }),
  ),
  level: 'debug',
};
const logConsole: ConsoleTransportInstance = new Console(consoleOptions);

const fileOptions: FileTransportOptions = {
  dirname: DIR_PATH,
  filename: 'ms-mail-gateway.log',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.logstash(),
  ),
  level: 'debug',
};
const logFile: FileTransportInstance = new transports.File(fileOptions);

export const winstonConfig = {
  transports: [logConsole, logFile],
};
