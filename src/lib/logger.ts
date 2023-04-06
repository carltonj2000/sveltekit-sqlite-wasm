export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'NONE';

const LEVELS: LogLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'];

export default class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;

  private constructor() {
    const storedLogLevel = sessionStorage.getItem('logLevel') as LogLevel;

    if (storedLogLevel && this.isValidLogLevel(storedLogLevel)) {
      this.logLevel = storedLogLevel;
    } else {
      this.logLevel = 'INFO';
      sessionStorage.setItem('logLevel', this.logLevel);
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public getAllLevels(): LogLevel[] {
    return LEVELS;
  }

  public getLevel(): LogLevel {
    return this.logLevel;
  }

  public isValidLogLevel(logLevel: LogLevel): boolean {
    return LEVELS.includes(logLevel);
  }

  private shouldLog(level: LogLevel) {
    return LEVELS.indexOf(level) >= LEVELS.indexOf(this.logLevel);
  }
  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog('DEBUG')) {
      console.log(`[DEBUG]: ${message}`, ...args);
    }
  }
  public info(message: string, ...args: any[]): void {
    if (this.shouldLog('INFO')) {
      console.log(`[INFO]: ${message}`, ...args);
    }
  }
  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog('WARN')) {
      console.log(`[WARN]: ${message}`, ...args);
    }
  }
  public error(message: string, ...args: any[]): void {
    if (this.shouldLog('ERROR')) {
      console.log(`[ERROR]: ${message}`, ...args);
    }
  }
  public setLogLevel(level: LogLevel): void {
    if (this.isValidLogLevel(level)) {
      this.logLevel = level;
      this.info(`Log level set to ${level}`);
    } else {
      throw new Error(`Invalid log level: ${level}`);
    }
  }
  public getLogLevel(): LogLevel {
    return this.logLevel;
  }
}
