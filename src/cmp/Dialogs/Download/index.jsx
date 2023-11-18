import { useState, useCallback, useEffect, useContext } from 'react';
import {
    Dialog, Button, FormGroup,
    MenuItem, TextField, Select,
    FormHelperText
} from '@mui/material';
import {
    toPng, toJpeg
} from 'html-to-image';
import { DEFAULT_DOWNLOAD_FORMAT, DOWNLOAD_FORMATS } from 'src/constants';
import { saveAsStateFileJSON, downloadAs } from 'src/utils';
import ctx from 'src/Context';
import useStyles from './styles';

const DownloadDialog = ({ visibility, setVisibility, domRef }) => {
    const classes = useStyles(),
        isRetina = window.devicePixelRatio > 1,
        { state, state: { backgroundColorAlpha } } = useContext(ctx),
        [format, setFormat] = useState(DEFAULT_DOWNLOAD_FORMAT),
        [filename, setFilename] = useState(''),
        [downloadEnabled, setDownloadEnabled] = useState(false),
        [validFilename, setValidFilename] = useState(true),
        onClose = useCallback(
            () => {
                setVisibility(false);
                setFilename('');
                setDownloadEnabled(false);
                setValidFilename(true);
                setFormat(DEFAULT_DOWNLOAD_FORMAT);
            },
            [setVisibility]
        ),
        toJson = useCallback(
            () => saveAsStateFileJSON(state),
            [state]
        ),
        alphaFlagLabel = backgroundColorAlpha ? '' : ' (turned OFF)',
        retinaHint = ' Seems like this device uses a retina resolution, exported size will be affected proportionally.', 
        formatToReader = {
            [DOWNLOAD_FORMATS.json]: {
                executor: toJson,
                innerHint: 'I/O',
                outerHint: `This format is the only importable one.`
            },
            [DOWNLOAD_FORMATS.jpeg]: {
                executor: toJpeg,
                outerHint: isRetina ? retinaHint : false
            },
            [DOWNLOAD_FORMATS.png]: {
                executor: toPng,
                innerHint: `alpha bg${alphaFlagLabel}`,
                outerHint: `This format supports background alpha transparency${alphaFlagLabel}.${isRetina ? retinaHint : ''}`
            },
        },
        changeFormat = e => setFormat(e.target.value),
        changeName = e => {
            setValidFilename(e.target.value.match(/^[0-9a-zA-Z ... ]+$/));
            setFilename(e.target.value);
        },
        doDownload = useCallback(() => {
            const dom = domRef.current;
            console.log({dom});
            format in formatToReader && formatToReader[format].executor(dom).then(
                downloadAs(`${filename}.${format}`)
            ).then(onClose);
        }, [format, filename]);

    useEffect(() => {
        setDownloadEnabled(format && validFilename && filename.length);
    }, [format, validFilename]);

    return (
        <Dialog open={visibility} onClose={onClose} disableRestoreFocus>
            <div className={classes.Dialog}>
                <h3>Download as <em>.{format}</em></h3>
                <FormGroup>
                    <TextField
                        error={!validFilename}
                        helperText={'your file name is not fitting'}
                        className={classes.SpaceUp}
                        required
                        label="file name without extension" variant="outlined"
                        value={filename}
                        onChange={changeName}
                    />
                    <Select
                        className={classes.SpaceUp}
                        required
                        value={format}
                        onChange={changeFormat}
                    >
                        {Object.keys(formatToReader).map(format =>
                            <MenuItem key={format} value={format}>
                                {format}
                                {formatToReader[format].innerHint ? <div className={classes.Compliant}>{formatToReader[format].innerHint}</div> : ''}
                            </MenuItem>
                        )}
                    </Select>
                    <FormHelperText className={classes.Warn}>{
                        formatToReader[format].outerHint || " "
                    }</FormHelperText>
                </FormGroup>
                <Button className={classes.DownloadButton} disabled={!downloadEnabled} variant="contained" onClick={doDownload}>Download</Button>
            </div>
        </Dialog>
    );
};
export default DownloadDialog;