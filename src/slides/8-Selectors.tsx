import * as React from 'react';

import { Slide } from '../components/slide/slide';
import { Code } from '../components/code/code';

const todoCode = require('!!raw-loader!../examples/todo/todo');

export const Slide8p1 = () => (
    <Slide title="Selectors">
        <Code code={'(state) => value'} id="store"/>
        <br/>
        <ul>
            <li>Selectors are like getters</li>
            <li>Can be combined in interesting ways</li>
            <li>Compute derived data</li>
            <li>Are pure functions (but we memoise them)</li>
        </ul>
    </Slide>
)

export const Slide8p2 = () => (
    <Slide title="Selectors">
        <Code code={todoCode} id="selector-example"/>
    </Slide>
)
