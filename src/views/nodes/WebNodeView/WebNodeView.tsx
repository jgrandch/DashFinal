import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, WebNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./WebNodeView.scss";

interface WebNodeProps {
    store: WebNodeStore;
    group: NodeCollectionStore 
}


@observer
export class WebNodeView extends React.Component<WebNodeProps> {

    state = {
        // Track whether the user is in linking mode
        isLinking: false,
        // The ID of the node to link to
        targetNodeId: null, 
    };

    startLinking = () => {
        this.setState({ isLinking: true });
    };

    handleNodeClick = (nodeId: string) => {
        const { store } = this.props;
        const { isLinking } = this.state;

        if (isLinking) {
            // Link the node
            store.linkNode(nodeId); 
            // Stop linking mode   
            this.setState({ isLinking: false, targetNodeId: nodeId }); 
            // link to all nodes in the store... needs to be patched though
            this.props.group.linkNodesInGroup(nodeId);
        }
    };


    render() {


        const { store } = this.props;
        const { isLinking } = this.state;

     
        return (
     
            
             <div className="node webNode" 
             onClick={() => this.handleNodeClick(store.Id)}
             style={{ transform: store.transform }} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
               
            <TopBar store={store}/>
            <button onClick={this.startLinking}>Start Linking</button>
                {/* display linking mode */}
                {isLinking && <p>Click on this node again to link!</p>}
            
                {store.linkedNodes.length > 0 && (
                 
                 <select style={{ width: "200px" }}>
                        <option value="">--Click to view linked nodes--</option>
                            {store.linkedNodes.map(id => (
                                <option key={id} value={id}>
                                    Node ID: {id}
                                </option>
                            ))}
                        </select>
                 
                )}
            <div className="scroll-box">
            <div className="content">
                        <h3 className="title">{store.title}</h3>
                    </div>
            {/* iframe hold the static map website */}
            <iframe
                id="WebMap"
                title="WebMap"
                width="auto"
                height="auto"
                src={store.url}>
                </iframe>   
                </div>
            </div> 

        );
    }
}