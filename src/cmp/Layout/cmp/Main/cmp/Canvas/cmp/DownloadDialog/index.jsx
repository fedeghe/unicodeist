/* eslint-disable no-unused-vars */
import {
    useContext, useState,
    useCallback, useEffect
} from 'react';
import Dialog from '@mui/material/Dialog';
import copy from 'copy-to-clipboard';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import Select from '@mui/material/Select';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import CopyDone from '../../../CopyDone';
import ctx from './../../../../../../../../Context';
import ACTIONS from './../../../../../../../../reducer/actions';

import useStyles from './styles';

const formatToReader = {
    png: toPng,
    jpeg: toJpeg,
    blob: toBlob,
    pixedata: toPixelData,
    svg: toSvg
};

const DownloadDialog = ({visibility, setVisibility, domRef }) => {
    
    const classes = useStyles(),
        [format, setFormat] = useState(""),
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
            ).then(() => setVisibility(false));
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
                            className={classes.SpaceDown}
                            required label="file name with no extension" variant="outlined"
                            onChange={changeName}
                        />
                        <br />
                        <Select
                            className={classes.SpaceDown}
                            required
                            displayEmpty
                            value={format}
                            label="Age"
                            onChange={changeFormat}
                        >
                            <MenuItem value="">
                                <em>choose download format</em>
                            </MenuItem>
                            {Object.keys(formatToReader).map(format => 
                                <MenuItem key={format} value={format}>{format}</MenuItem>    
                            )}
                        </Select>
                    </FormGroup>
                    
                    <Button disabled={!downloadEnabled} variant="contained" onClick={doDownload}>Download</Button>
                </div>
            </Dialog>
        </div>
    );
};
export default DownloadDialog;