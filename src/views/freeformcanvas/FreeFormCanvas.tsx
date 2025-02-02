import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore, WebNodeStore } from "../../stores";
import { ImageNodeStore } from "../../stores";
import { ImageNodeView, NestedCanvasView } from "../nodes";
import { TextNodeView, VideoNodeView } from "../nodes";
import "./FreeFormCanvas.scss";
import { WebNodeView } from "../nodes/WebNodeView/WebNodeView";
import { NestedNodeStore } from "../../stores/NestedNodeStore";





interface FreeFormProps {
    store: NodeCollectionStore
}

//Modified to permit resizing and efficient text editing. Can only execute the canvas scrolling function when the shift key is down!
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {

    
    private isPointerDown: boolean | undefined;

    onPointerDown = (e: React.PointerEvent): void => {
        // Only proceed if Shift key is pressed
        if (!e.shiftKey) return;

        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        // Only proceed if Shift key is pressed
        if (!e.shiftKey) return;

        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        // Only proceed if Shift key is pressed and pointer is down
        if (!this.isPointerDown || !e.shiftKey) return;

        e.stopPropagation();
        e.preventDefault();
        this.props.store.x += e.movementX;
        this.props.store.y += e.movementY;
        this.props.store.cornerx += e.movementX;
        this.props.store.cornery += e.movementY;
    }


    

    render() {
        let store = this.props.store;
        return (
            
            
            <div className="freeformcanvas-container" 
            onPointerDown={this.onPointerDown}
            >
                <div className="freeformcanvas" style={{ transform: store.transform }}>
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
