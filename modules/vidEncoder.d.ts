//  FilEncoderUploader, is designed for encoding files and handling files file uploads.

declare module 'filEncoder' {
  import { IncomingMessage, ServerResponse } from 'http';

  export interface File {
    size: number;
    path: string;
    name: string;
    type: string;
    mtime: Date;
    toJSON(): object;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Part {
    headers: { [key: string]: string };
    name: string;
    filename?: string;
    mime?: string;
  }

  export interface IncomingFormOptions {
    encoding?: string;
    uploadDir?: string;
    keepExtensions?: boolean;
    maxFileSize?: number;
    maxFieldsSize?: number;
    maxFields?: number;
    hash?: boolean | string;
    multiples?: boolean;
  }

  export class IncomingForm {
    constructor(options?: IncomingFormOptions);
    on(event: 'progress', listener: (bytesReceived: number, bytesExpected: number) => void): this;
    on(event: 'fileBegin', listener: (name: string, file: File) => void): this;
    on(event: 'field', listener: (name: string, value: string) => void): this;
    on(event: 'file', listener: (name: string, file: File) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'aborted', listener: () => void): this;
    on(event: 'end', listener: () => void): this;
    parse(req: IncomingMessage, callback?: (err: Error, fields: Fields, files: Files) => void): void;
  }
}
