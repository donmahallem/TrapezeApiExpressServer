import { CorsOptions } from "cors";
import { IHelmetConfiguration } from "helmet";
import * as configSchema from './../dist/config-schema.json';
import { validate, ValidatorResult } from 'jsonschema';
import * as fs from "fs";
import { config } from "shelljs";
/**
 * General Server Configuration
 */
export interface IServerConfig {
    /**
     * Options to be used for cors header
     */
    cors?: CorsOptions;
    /**
     * Helmet configuration
     */
    helmet?: IHelmetConfiguration;
    /**
     * port to run on
     */
    port: number;
    /**
     * endpoint to query data from
     */
    endpoint: string;
}

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