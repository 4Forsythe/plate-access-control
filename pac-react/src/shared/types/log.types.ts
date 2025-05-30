export type ILogStatus = 'info' | 'success' | 'warn' | 'error';

export type LogType = {
  id: string;
  plate?: string;
  action: string;
  status: ILogStatus;
  timestamp: string;
};
