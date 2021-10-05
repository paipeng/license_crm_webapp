import { User } from "./user.model";

export class License {
    public owner: string | undefined;
    public app: string | undefined;
    public expire: number | undefined;
    public nanogrid: boolean | undefined;
    public uuid: string | undefined;
    public filePath: string | undefined;
    public signature: string | undefined;
    public user: User | undefined;
}