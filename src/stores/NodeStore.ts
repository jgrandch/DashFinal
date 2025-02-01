import { computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website,
    Nested
}

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;


    @observable
    public width: number = 0;

    @observable
    public height: number = 0;
    
    @observable
    public linkedNodes: string[] = [];

    // temp method for linking
    public linkNode(nodeId: string) {
        if (!this.linkedNodes.includes(nodeId)) {
            this.linkedNodes.push(nodeId);
        }
    }

    // temp method for unlinking (not implemented)
    public unlinkNode(nodeId: string) {
        this.linkedNodes = this.linkedNodes.filter(id => id !== nodeId);
    }

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }

    
}