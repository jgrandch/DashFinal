import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";

//Using CKEditor, good looking and reliable text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo
  } from 'ckeditor5';
  
  import 'ckeditor5/ckeditor5.css';
  

interface TextNodeProps {
    store: StaticTextNodeStore;
    group: NodeCollectionStore 
    
}


@observer
export class TextNodeView extends React.Component<TextNodeProps> {

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
             <div className="node textNode" 
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

{/* CKeditor style setup to organize the editor */}
<CKEditor
      editor={ ClassicEditor }
      config={ {
        toolbar: [
          'undo', 'redo', '|',
          'heading', '|', 'bold', 'italic', '|',
          'link', 'insertTable', 'mediaEmbed', '|',
          'bulletedList', 'numberedList', 'indent', 'outdent'
        ],
        //non-premium lisence default
        licenseKey: 'GPL',
        plugins: [
          Bold,
          Essentials,
          Heading,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          MediaEmbed,
          Paragraph,
          Table,
          Undo
        ],
        initialData: '<h1>Your Text Goes Here!</h1>',
      } }
    />
  </div>
         
            </div> 

        );
    }
}