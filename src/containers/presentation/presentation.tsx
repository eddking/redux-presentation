import * as React from 'react';
import { connect } from 'react-redux';
import { SFC } from 'react';
import { State } from '../../reducers/root';
import { currentSlide } from '../../reducers/slide';
import {
    Actions,
    click,
    nextSlide,
    previousSlide,
} from '../../actions/actions';
import { DispatchFunction } from '../../lib/redux';

const styles = require('./styles.scss');

interface PresentationProps {
    currentSlide: number;
    handleKeyPress: (max: number, current: number) => () => void;
}

const mapStateToProps = (state: State) => ({
    currentSlide: currentSlide(state),
});

const mapDispatchToProps = (dispatch: DispatchFunction<Actions>) => ({
    handleKeyPress: handleKeyPress(dispatch)
});

const handleKeyPress = (dispatch: DispatchFunction<Actions>) => (maxSlide: number, currentSlide: number) => (event: any) => {
    if (event.key === 'j') {
        if (currentSlide === maxSlide) {
            return;
        }
        dispatch(nextSlide());
    }
    if (event.key === 'k') {
        if (currentSlide === 0) {
            return;
        }
        dispatch(previousSlide());
    }
}

const PresentationComponent: SFC<PresentationProps> = ({
    currentSlide,
    children,
    handleKeyPress
}) => {
    const maxSlide = React.Children.count(children) - 1;
    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
    let slide = React.Children.toArray(children)[currentSlide];
    return (
        <div
            className={styles.presentation}
            tabIndex={0}
            onKeyPress={handleKeyPress(maxSlide, currentSlide)}
        >{ slide }</div>
    );
}

export const Presentation = connect(mapStateToProps, mapDispatchToProps)(PresentationComponent);
