import { List } from "../lists/list.model";
import { Workspace } from "../workspaces/workspace.model";

export class Table {

    id!: string;
    title!: string;
    lists!: Array<List>;

}