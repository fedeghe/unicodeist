import { useState, useCallback, useEffect, useContext } from 'react';
import {
    Dialog, Button, FormGroup,
    MenuItem, TextField, Select,
    FormHelperText
} from '@mui/material';
import {
    toPng, toJpeg
} from 'html-to-image';
import { saveAsFileJSON } from './../../../../../../../../utils';
import ctx from './../../../../../../../../Context';

import useStyles from './styles';

const defaultFormat = 'json';


const DownloadDialog = ({visibility, setVisibility, domRef }) => {
    
    const classes = useStyles(),
        {state} = useContext(ctx),
        [format, setFormat] = useState(defaultFormat),
        [filename, setFilename] = useState(''),
        [downloadEnabled, setDownloadEnabled] = useState(false),
        onClose = useCallback(
            () => {
                setVisibility(false);
                setFilename('');
                setFormat('');
            },
            [setVisibility]
        ),
        toJson = useCallback(
            () => saveAsFileJSON(state),
            [state]
        ),
        formatToReader = {
            json: toJson,
            jpeg: toJpeg,
            png: toPng,
        },
        changeFormat = e => setFormat(e.target.value),
        changeName = e => setFilename(e.target.value),
        doDownload = useCallback(() => {
            const dom = domRef.current;
            format in formatToReader && formatToReader[format](dom).then(
                dataUrl => {
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.setAttribute('download', `${filename}.${format}`);
                    a.click();
                }
            ).then(onClose);
        }, [format, filename]);

    useEffect(() =>
        setDownloadEnabled(format && filename),
        [format, filename]
    );

    return (
        <div>
            <Dialog open={visibility} onClose={onClose}>
                <div className={classes.Dialog}>
                    <h3>Download as</h3>
                    <FormGroup>
                        <TextField
                            className={classes.SpaceUp}
                            required
                            label="file name without extension" variant="outlined"
                            onChange={changeName}
                        />
                        <Select
                            className={classes.SpaceUp}
                            required
                            value={format}
                            onChange={changeFormat}
                        >
                            {Object.keys(formatToReader).map(format => 
                                <MenuItem key={format} value={format}>{format}</MenuItem>    
                            )}
                        </Select>
                        <FormHelperText className={classes.Warn}>{format === defaultFormat ? 'this is the only importable format' : " "}</FormHelperText>
                    </FormGroup>
                    
                    <Button className={classes.DownloadButton}disabled={!downloadEnabled} variant="contained" onClick={doDownload}>Download</Button>
                </div>
            </Dialog>
        </div>
    );
};
export default DownloadDialog;