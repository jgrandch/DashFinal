import React from 'react';
import './App.scss';
import { NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore, WebNodeStore } from './stores';
import { ImageNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { NestedNodeStore } from './stores/NestedNodeStore';

const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {

    state = {
        isInputVisible: false,
        nodeType: 'Image',
        nodeTitle: '',
    };
    //call grid organization
    handleOrganizeInGrid = () => {
        mainNodeCollection.organizeNodesInGrid(); 
    };
    //call node addition
    handleNodeAddition = () => {
        this.setState({ isInputVisible: true });
    };
    //inputs for the node selector menu
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [event.target.name]: event.target.value } as any);
    };
    //inputs for the node type changer based on selected option
    handleNodeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ nodeType: event.target.value });
    };
    //call the node removal method
    handleRemoveNode = () => {
        mainNodeCollection.removeNodes();
    }
    //handle the creation of new nodes
    handleSubmitNode = () => {
        const { nodeType, nodeTitle } = this.state;
        let newNode: NodeStore;

        switch (nodeType) {
            case 'Text':
                newNode = new StaticTextNodeStore({ type: StoreType.Text, x: -mainNodeCollection.cornerx, y: -mainNodeCollection.cornery, title: nodeTitle });
                break;
            case 'Video':
                newNode = new VideoNodeStore({ type: StoreType.Video, x: -mainNodeCollection.cornerx, y: -mainNodeCollection.cornery, title: nodeTitle, url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4"  });
                break;
            case 'Image':
                newNode = new ImageNodeStore({ type: StoreType.Image, x: -mainNodeCollection.cornerx, y: -mainNodeCollection.cornery, title: nodeTitle, url: "https://the7eagles.com/wp-content/uploads/2024/05/Parts-of-Image-URL-1.webp" });
                break;
            case 'Website':
                newNode = new WebNodeStore({ type: StoreType.Website, x: -mainNodeCollection.cornerx, y: -mainNodeCollection.cornery, title: nodeTitle, url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"});
                break;
            case 'Nested':
                newNode = new NestedNodeStore({ type: StoreType.Nested, x: -mainNodeCollection.cornerx, y: -mainNodeCollection.cornery });
                break;
            default:
                return;
        }
        //add the node from the case (altered by user input)
        mainNodeCollection.addSingleNode(newNode);
        // reset and hide our input
        this.setState({ isInputVisible: false, nodeTitle: '' });  
    };

    render() {
        const { isInputVisible, nodeType, nodeTitle } = this.state;

        return (
            <div className="App">
                <h1>StarterDash! ------Hold shift to scroll the canvas!!</h1>
                <button onClick={this.handleNodeAddition}>Add Nodes +</button>
                <button onClick={this.handleRemoveNode}>Remove Last Node</button>
                {/* Render only if visible input case is true*/}
                {isInputVisible && (
                    <div>
                        {/* select bar to allow us to choose our nodes */}
                        <select value={nodeType} onChange={this.handleNodeTypeChange}>
                            <option value="Text">Text</option>
                            <option value="Video">Video</option>
                            <option value="Image">Image</option>
                            <option value="Website">Website</option>
                            <option value="Nested">Nested</option>
                        </select>
                        <br />
                        <input
                            type="text"
                            name="nodeTitle"
                            placeholder="Enter node title"
                            value={nodeTitle}
                            onChange={this.handleInputChange}
                        />
                        <button onClick={this.handleSubmitNode}>Create Node</button>
                        

                    </div>
                )}
                 {/* Call grid organization */}
                <button onClick={this.handleOrganizeInGrid}>Organize Nodes in Grid</button>
                <FreeFormCanvas store={mainNodeCollection} /> 
            </div>
        );
    }
}

export default App;
