import * as React from 'react';
import { Provider } from 'react-redux'

import { Store } from '../lib/redux';
import { State } from '../reducers/root';
import { Actions } from '../actions/actions';

import { Code } from '../components/code/code';
import { Presentation } from './presentation/presentation';
import { Slide0 } from '../slides/0-Redux';
import { Slide1 } from '../slides/1-ManagingState';
import { Slide2p1, Slide2p2 } from '../slides/2-Background';
import { Slide3p1, Slide3p2 } from '../slides/3-WhyRedux';
import { Slide4p1, Slide4p2, Slide4p3 } from '../slides/4-Actions';
import { Slide5p1, Slide5p2, Slide5p3 } from '../slides/5-Reducers';
import { Slide6p1, Slide6p2, Slide6p3 } from '../slides/6-Store';
import { Slide7p1, Slide7p2 } from '../slides/7-Middleware';
import { Slide8p1, Slide8p2 } from '../slides/8-Selectors';
import {
    Slide9p1,
    Slide9p2,
    Slide9p3,
} from '../slides/9-WhyIsThisGood';

/* const code = require('!!raw-loader!../examples/ast/ast');*/
/* <Code code={code}/>*/

export const Root = (store: Store<State, Actions>) => {
    return (
        <Provider store={store as any}>
            <Presentation>
                <Slide0/>
                <Slide1/>
                <Slide2p1/>
                <Slide2p2/>
                <Slide3p1/>
                <Slide3p2/>
                <Slide4p1/>
                <Slide4p2/>
                <Slide4p3/>
                <Slide5p1/>
                <Slide5p2/>
                <Slide5p3/>
                <Slide6p1/>
                <Slide6p2/>
                <Slide6p3/>
                <Slide7p1/>
                <Slide7p2/>
                <Slide8p1/>
                <Slide8p2/>
                <Slide9p1/>
                <Slide9p2/>
                <Slide9p3/>
            </Presentation>
        </Provider>
    )
}
