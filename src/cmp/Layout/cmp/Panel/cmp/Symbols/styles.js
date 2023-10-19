import { createUseStyles } from 'react-jss';

export default createUseStyles({
    Container: {
        flexDirection:'column',
        overflow: ({canScrollSymbols}) => canScrollSymbols ? 'scroll': 'hidden',
    }
});