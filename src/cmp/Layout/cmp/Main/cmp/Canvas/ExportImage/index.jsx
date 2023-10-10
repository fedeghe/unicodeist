import {useEffect, useRef} from 'react';
import Channel from '@fedeghe/channeljs';

import useStyles from './styles';
const ExportImage = () => {
    const classes = useStyles();
    const ref = useRef();
    useEffect(() => {
        if (ref.current)
            Channel.get('event').sub('exportImage', html => {
                console.log(html);
            });
    }, [ref]);
    return <div className={classes.Canvas}><canvas ref={ref} />nananan</div>;
    
};
export default ExportImage;