import * as React from 'react';

import { Slide } from '../components/slide/slide';
import { Code } from '../components/code/code';

const todoCode = require('!!raw-loader!../examples/todo/todo');

export const Slide5p1 = () => (
    <Slide title="Reducers">
        <Code code={todoCode} id="reducertype"/>
        <br/>
        <ul>
            <li>Manage a portion of the state</li>
            <li>Are functions that take a state & action, return new state</li>
            <li>Exactly the same as something passed to <code>Array.reduce</code></li>
            <li>Are pure functions with no side effects</li>
            <li>Combined by a handy helper function <code>combineReducers</code></li>
        </ul>
    </Slide>
)

export const Slide5p2 = () => (
    <Slide title="Reducers">
        <Code code={todoCode} id="todoReducer"/>
    </Slide>
)

export const Slide5p3 = () => (
    <Slide title="Reducers">
        <Code code={todoCode} id="todoListReducer"/>
    </Slide>
)
