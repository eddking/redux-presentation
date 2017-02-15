
import * as React from 'react';

import { Slide } from '../components/slide/slide';
import { Code } from '../components/code/code';

const todoCode = require('!!raw-loader!../examples/todo/todo');

export const Slide4p1 = () => (
    <Slide title="Actions">
        <ul>
            <li>Have a <code>type</code> property</li>
            <li>Represent something thats happened</li>
            <li>Dispatched by views or as the result of external input</li>
        </ul>
    </Slide>
)

export const Slide4p2 = () => (
    <Slide title="Actions">
        <Code code={todoCode} id="actionExample"/>
    </Slide>
)

export const Slide4p3 = () => (
    <Slide title="Action Creators">
        <Code code={todoCode} id="actionCreator"/>
        <br/>
        Helper functions for creating actions
    </Slide>
)
