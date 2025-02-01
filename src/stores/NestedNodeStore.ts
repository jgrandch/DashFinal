import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class NestedNodeStore extends NodeStore {

    constructor(initializer: Partial<NestedNodeStore>) {
   
        super();
        Object.assign(this, initializer);

    }

}