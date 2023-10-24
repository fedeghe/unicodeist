import {useState} from 'react';
import copy from 'copy-to-clipboard';
import useStyles from './styles';
import SnackMessage from 'src/cmp/SnackMessage';
import { getCodes } from 'src/utils';
const Item = ({char, onSelect}) => {
    const classes = useStyles(),
        codes = getCodes(char),
        onClick = () => onSelect(char),
        [copyDone, setCopyDone] = useState(false),
        onCopy = e => {
            const what = e.target.dataset.what;
            copy(codes[what]);
            setCopyDone(what);
            e.stopPropagation();
        },
        hideConfirmation = () => {
            setCopyDone(false);
        },
        postTitle = ' (click to copy)';
    return <>
        <div className={classes.Item} onClick={onClick}>
            <div className={classes.Char} title="click to add">{char}</div>
            <div className={classes.List}>
                {[{
                    k: 'k1',
                    els: [
                        { label: 'u:', key: 'unicode', title: 'unicode' + postTitle },
                        { label: 'oct:', key: 'octal', title: 'octal' + postTitle },
                        { label: 'dec:', key: 'decimal', title: 'decimal' + postTitle }
                    ]
                },{
                    k: 'k2',
                    els: [
                        { label: 'hex:', key: 'hex', title: 'hexadecimal' + postTitle },
                        { label: 'css:', key: 'css', title: 'css content' + postTitle },
                        { label: 'html:', key: 'html', title: 'html entity' + postTitle }
                    ]
                }].map(container => <div key={container.k} className={classes.Col}>{
                    container.els.map(el =>
                        <div key={el.key} className={classes.Small} title={el.title} data-what={el.key} onClick={onCopy}>
                            <span className={classes.Bold}>{el.label}</span> {codes[el.key]}
                        </div>
                    )}
                    </div>
                )}
            </div>
        </div>
        {copyDone && <SnackMessage message={`${copyDone} copied to clipboard`} onClose={hideConfirmation} open={Boolean(copyDone)} setOpen={setCopyDone}/>}
    </>;

};
export default Item;