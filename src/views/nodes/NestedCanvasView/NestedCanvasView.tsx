import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, NodeStore,ImageNodeStore,StoreType} from "../../../stores";
import "./NestedCanvasView.scss";
import { NestedNodeStore } from "../../../stores/NestedNodeStore";
import { TopBar } from "../TopBar";
import { NestedFreeFormCanvas } from "../../NestedFreeForm/NestedFreeFormCanvas";

const subNodeCollection = new NodeCollectionStore();
//temp
let numNodes: number = 5;
let nodes: NodeStore[] = [];

for (let i = 0; i < numNodes ; i++) {
    nodes.push(new ImageNodeStore({ type: StoreType.Image, x: Math.random() * 100, y: Math.random() * 100, title: "Image Node Title", url: "https://the7eagles.com/wp-content/uploads/2024/05/Parts-of-Image-URL-1.webp" }));
}

// add set of 5 nodes to test node collection
subNodeCollection.addNodes(nodes);

interface NestedProps {
    store: NestedNodeStore

}

@observer
export class NestedCanvasView extends React.Component<NestedProps> {

  
render() {
        let store = this.props.store;
        return (
            
            <div className="node nestedNode" 
            
            style={{ transform: store.transform }} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
            <TopBar store={store}/>
            {/* wraps the free form canvas to allow for a working "sub canvas" */}
            <div className="content">
                <NestedFreeFormCanvas store={subNodeCollection} />
            </div>
    
                
            </div>
        );
    }

}
