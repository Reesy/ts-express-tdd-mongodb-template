
import { resolve } from "path"

import { config as dotEnvConfig } from "dotenv"

let dotEnvConfigPath: string = resolve(__dirname, "../.env");

dotEnvConfig({ path: dotEnvConfigPath })

if (typeof(process.env.MONGO_ROOT_USER) === "undefined") 
{
    throw new Error("MONGO_ROOT_USER environment var is not defined");
};

if (typeof(process.env.MONGO_ROOT_PASSWORD) === "undefined") 
{
    throw new Error("MONGO_ROOT_PASSWORD environment var is not defined");
};

if (typeof(process.env.MONGO_HOST) === "undefined")
{
    throw new Error("MONGO_HOST environment var is not defined");
}

if (typeof(process.env.MONGO_PORT) === "undefined")
{
    throw new Error("MONGO_PORT environment var is not defined");
}

export class config {
    public static port: number = 8000;
    public static dbuser: any = process.env.MONGO_ROOT_USER;
    public static dbpassword: any = process.env.MONGO_ROOT_PASSWORD;
    public static dbhost: any = process.env.MONGO_HOST;
    public static dbport: any = process.env.MONGO_PORT;
    public static dbname: string = "ts_mongo_tdd_users";
    public static dbcollection: string = "users";
}