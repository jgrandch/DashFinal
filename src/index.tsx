import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.scss";
import { NodeCollectionStore } from './stores/NodeCollectionStore';
import { StoreType } from './stores/NodeStore';
import { StaticTextNodeStore } from './stores/StaticTextNodeStore';
import { VideoNodeStore } from './stores/VideoNodeStore';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';


const mainNodeCollection = new NodeCollectionStore();
ReactDOM.render((
    <div>
        <FreeFormCanvas store={mainNodeCollection} />
    </div>), document.getElementById('root'));

// create a bunch of text and video nodes (you probably want to delete this at some point)
let numNodes = 300;
let maxX = 10000;
let maxY = 10000;
let nodes = [];

// add static text nodes
for (let i = 0; i < numNodes / 2; i++) {
    nodes.push(new StaticTextNodeStore({ type: StoreType.Text, x: Math.random() * maxX, y: Math.random() * maxY, title: "Text Node Title", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
}

// add video nodes
for (let i = 0; i < numNodes / 2; i++) {
    nodes.push(new VideoNodeStore({ type: StoreType.Video, x: Math.random() * maxX, y: Math.random() * maxY, title: "Video Node Title", url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
}

mainNodeCollection.addNodes(nodes);
