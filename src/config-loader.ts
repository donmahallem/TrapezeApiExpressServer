import * as configSchema from './../dist/config-schema.json';
import { validate, ValidatorResult } from 'jsonschema';
import * as fs from "fs";
import { IServerConfig } from './config.js';
export const loadConfigFromFile: (filename: string) => IServerConfig = (filename: string): IServerConfig => {
    const data: string = fs.readFileSync(filename, { encoding: 'utf-8' });
    const parsed: any = JSON.parse(data);
    const result: ValidatorResult = validate(parsed, configSchema);
    if (result.valid === true) {
        return parsed;
    } else {
        throw new Error('no valid config provided');
    }
}