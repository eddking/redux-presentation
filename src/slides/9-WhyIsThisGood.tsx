import * as React from 'react';

import { Slide } from '../components/slide/slide';
import { Code } from '../components/code/code';

const todoCode = require('!!raw-loader!../examples/todo/todo');

export const Slide9p1 = () => (
    <Slide title="Why Redux">
        <ul>
            <li>Testing is easier</li>
            <li>Data is democratized</li>
            <li>Powerful debugging tools</li>
            <li>Clear, enforced structure</li>
        </ul>
    </Slide>
)

export const Slide9p2 = () => (
    <Slide title="Redux in the tag">
        <ul>
            <li>We have our own port of Redux</li>
            <li>Actions are replicated across iframes</li>
            <li>Expressions for stretch & save use Selectors</li>
            <li>We're waiting for typescript 2.2 to use redux saga</li>
        </ul>
        <br/>
        Further reading
        <br/>
        <br/>
        <ul>
            <li>Dan Abramov's Introductory talk to redux</li>
            <li>CQRS & Event-Sourcing - a back-end architecture</li>
        </ul>
    </Slide>
)

export const Slide9p3 = () => (
    <Slide title="Fini">
        Questions?
    </Slide>
)
