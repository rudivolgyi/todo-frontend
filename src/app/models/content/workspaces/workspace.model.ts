import { Table } from "../tables/table.model";

export class Workspace {

    id!: string;
    title!: string;
    tables!: Array<Table>;

}