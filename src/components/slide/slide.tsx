import * as React from 'react';
import { SFC } from 'react';
import { connect } from 'react-redux';

interface SlideProps {
    title?: string;
}

const styles = require('./styles.scss');

export const Slide: SFC<SlideProps> = ({ children, title }) => {
    let header = title === undefined ? null : (<h1>{ title  }</h1>) 
    return (
        <div className={styles.slide}>
            { header }
        <div className={styles.content}>{ children }</div>
        </div>
    );
}
