import * as React from 'react';

import { Slide } from '../components/slide/slide';

const problemImg = require('../../images/flux_architecture_problem.png');
const solutionImg = require('../../images/flux_architecture_solution.png');

export const Slide2p1 = () => (
    <Slide title="flux architecture">
        <img
            style={{ width: '17em' }}
            src={problemImg}
        />
        Facebook had a problem
    </Slide>
)

// Facebook had a problem, this is what happened to their traditonal single-page app
// Views depend on and update multiple models, the result is that it can be quite hard
// to keep everything in sync. especially if the views themselves hold state

export const Slide2p2 = () => (
    <Slide title="flux architecture">
        <img
            style={{ width: '17em' }}
            src={solutionImg}
        />
        Flux was their solution
    </Slide>
)

// So they came up with the flux architecture, the flux architecture is uni-directional
// so there is a predictable flow to information. Views create actions and send them to the dispatcher
// the dispatcher notifies the models, which in turn update any subscribed views
// This flux architecture, although better, still has some problems.
// Redux was designed to implement the dispatcher store-component of the flux architecture
