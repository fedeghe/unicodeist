import { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { REPO_URL } from 'src/constants';

import useStyles from './styles';

const CopyDialog = ({visibility, setVisibility}) => {
    const classes = useStyles(),
        onClose = useCallback(
            () => setVisibility(false),
            [setVisibility]
        ),
        onContribute = () => {
            onClose();
            window.open(REPO_URL);
        };

    return (
        <Dialog open={visibility} onClose={onClose} disableRestoreFocus>
            <div className={classes.Dialog}>
                <h3>Hi</h3>
                <p>I are thrilled to invite you to contribute to this project.</p>
                <p>Your valuable contributions can help me to enhance the project and make it better.</p>
                <p>Whether you have ideas, suggestions, or expertise in coding, I welcome you to contribute by filing issues or opening pull requests.</p>                    
                <p>To get started, please visit the <a onClick={onContribute} rel='noreferrer' href="javascript:;" target="_blank"> project repository on GitHub</a> and explore the existing issues or codebase.</p>
                <p>If you come across any issues or have ideas for improvements, feel free to file an issue or open a pull request. I`ll do my best to review and provide feedback promptly.</p>
                <p>Thank you for considering contributing to thi project.</p>
                <p>Best regards,</p>
                <p>Federico</p>
            </div>
        </Dialog>
    );
};
export default CopyDialog;