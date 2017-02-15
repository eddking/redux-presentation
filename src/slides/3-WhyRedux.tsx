
import * as React from 'react';

import { Slide } from '../components/slide/slide';

const overviewImg = require('../../images/redux_overview.png');

export const Slide3p1 = () => (
    <Slide title="Why redux?">
        <ul>
            <li>More of a pattern than a library</li>
            <li>Single source of truth</li>
            <li>Data flow is uni-directional</li>
            <li>State is immutable</li>
            <li>Very composable, its just functions</li>
        </ul>

    </Slide>
)

// So you should be skeptical when anyone tries get you to adopt a new technology
// so I'll try and sell it to you now.

// The redux library itself is tiny, the core logic is only about 50 lines of code
// It gives you a single point of truth, There is only one store of state in redux.
// this might sound quite scary, but it actually has some very nice consequences

export const Slide3p2 = () => (
    <Slide title="Overview">
        <img
            style={{ width: '17em' }}
            src={overviewImg}
        />
    </Slide>
)

// This is how redux looks, There is a single store, which is created with it's reducers
// Once created, the only way to change the state of the store, is to dispatch actions on it
// you cant change the reducers once it's been created.
