import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore, WebNodeStore } from "../../stores";
import { ImageNodeStore } from "../../stores";
import { ImageNodeView, NestedCanvasView } from "../nodes";
import { TextNodeView, VideoNodeView } from "../nodes";
import "./NestedFreeFormCanvas.scss";
import { WebNodeView } from "../nodes/WebNodeView/WebNodeView";
import { NestedNodeStore } from "../../stores/NestedNodeStore";





interface NestedFreeFormProps {
    store: NodeCollectionStore
}


@observer
export class NestedFreeFormCanvas extends React.Component<NestedFreeFormProps> {

    


    private isPointerDown: boolean | undefined;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
     
     
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
  
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return; 
        this.props.store.x += e.movementX;
        this.props.store.y += e.movementY;
    }

    

    render() {
        let store = this.props.store;
        return (
            
            
            <div className="nestedfreeformcanvas-container" 
            onPointerDown={this.onPointerDown}>
                <div className="nestedfreeformcanvas" style={{ transform: store.transform }}>
                    {   
                        // maps each item in the store to be rendered in the canvas based on the node type
                        store.nodes.map(nodeStore => {
                            switch (nodeStore.type) {
                                case StoreType.Text:
                                    
                                    return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} group={this.props.store}/>)
                                case StoreType.Video:
                                    return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} group={this.props.store}/>)
                                case StoreType.Image:
                                    return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} group={this.props.store}/>)
                                case StoreType.Website:
                                    return (<WebNodeView key={nodeStore.Id} store={nodeStore as WebNodeStore} group={this.props.store}/>)
                                case StoreType.Nested:
                                    return (<NestedCanvasView key={nodeStore.Id} store={nodeStore as NestedNodeStore}/>)
                                default:
                                    return (null);
                            }
                        })
                    }
                </div>
            </div>
            

        );
    }

}
