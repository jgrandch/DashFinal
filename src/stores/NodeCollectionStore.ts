import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

     //temp
     @observable
     public cornerx: number = 0;
 
     @observable
     public cornery: number = 0;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS transform property
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        //simple adding
        this.nodes.push(...stores); 

    }

    @action
    public addSingleNode(store: NodeStore): void {
        //streamlined adding 
        this.nodes.push(store); 
    }



    @action
    public removeSingleNode(store: NodeStore): void {
        const index = this.nodes.indexOf(store);
        if (index > -1) {
            // Remove the node based on ref
            this.nodes.splice(index, 1); 
        }
    }

    @action
    public removeNodes(): void {
        this.nodes.pop();
    }


     //Grid constants (spacing and columns)
     private gridSpacing: number = 400; 
     private columns: number = 6;


    // Action to organize nodes in a grid layout
    @action
    public organizeNodesInGrid(): void {
        this.nodes.forEach((node, index) => {
            // Calculate row and column positions
            const row = Math.floor(index / this.columns);
            const col = index % this.columns;

            // Node position updated based on spacing and col count
            node.x = col * this.gridSpacing; 
            node.y = row * this.gridSpacing; 
      
        });
    }

    //testing method for grand linking
    @action 
    public linkNodesInGroup(id: string): void{
        this.nodes.forEach((node, index) => {
         node.linkNode(id)
        });
    }

    // should return all the node Ids as a list of strings
    @computed
    public get allNodeIds(): string[] {
        return this.nodes.map((node) => node.Id); 
    }




  
 


    
}