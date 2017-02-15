import * as React from 'react';
import { DivProps } from '../../lib/util';

const hljs = require("highlight.js/lib/highlight.js");
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

const styles = require('./styles.scss');

interface CodeProps extends DivProps {
    code: string;
    id?: string;
    language?: string;
}

export const Code = ({ code, language, id }: CodeProps) => {
    language = language || 'typescript';
    id = id || '';
    // a 'begin' comment in the file indicates the displayed code block should start there
    // this lets us ignore irrelevant imports
    let parts = code.split(`// begin:${id}`);
    if (parts.length == 2) {
        code = parts[1];
    }
    parts = code.split(`// end:${id}`);
    if (parts.length == 2) {
        code = parts[0];
    }
    code = code.replace(/^\/\/ begin:.*$/, '')
    code = code.replace(/^\/\/ end:.*$/, '')
    let highlighted = hljs.highlight(language, code.trim(), true, false).value;
    return (<pre className={styles.code}><code className="hljs" dangerouslySetInnerHTML={{__html: highlighted}}></code></pre>);
}
