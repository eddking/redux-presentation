import * as React from 'react';

import { Slide } from '../components/slide/slide';
import { Code } from '../components/code/code';

const todoCode = require('!!raw-loader!../examples/todo/todo');


let code = '(next) => (action) => {\n\
    // Before\n\
    next(action);\n\
    // After\n\
};'

export const Slide7p1 = () => (
    <Slide title="Middleware">
        <ul>
            <li>Wraps the dispatch function</li>
            <li>Many libraries like Redux-Saga and Redux-Thunk</li>
            <li>Typical use case is side-effects and asynchronous actions</li>
        </ul>
        <br/>
        <Code code={code} id="store"/>
    </Slide>
)

export const Slide7p2 = () => (
    <Slide title="Redux-Saga">
        <Code code={todoCode} id="saga-example"/>
    </Slide>
)
