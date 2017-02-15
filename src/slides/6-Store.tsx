import * as React from 'react';

import { Slide } from '../components/slide/slide';
import { Code } from '../components/code/code';

const todoCode = require('!!raw-loader!../examples/todo/todo');

export const Slide6p1 = () => (
    <Slide title="Store">
        <Code code={todoCode} id="createStoreType"/>
        <br/>
        <ul>
            <li>Created with a reducer object</li>
            <li>Optionally has an initial state</li>
        </ul>
    </Slide>
)

export const Slide6p2 = () => (
    <Slide title="Store">
        <Code code={todoCode} id="store"/>
    </Slide>
)

export const Slide6p3 = () => (
    <Slide title="Store">
        <Code code={todoCode} id="dispatch"/>
        <br/>
        <ul>
            <li>Can be subscribed to for any state changes</li>
            <li>Has a dispatch method for actions</li>
        </ul>
    </Slide>
)
