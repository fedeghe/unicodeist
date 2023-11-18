/* eslint-disable no-unused-vars */
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon
} from "@mui/material";
import { useContext } from 'react';


import ctx from 'src/Context';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import BorderVerticalIcon from '@mui/icons-material/BorderVertical';
import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DeleteIcon from '@mui/icons-material/Delete';

import ACTIONS from 'src/reducer/actions';

import useStyles from './styles';

const BulkActions = () => {
    const {
            dispatch,
            state: {
                selected
            }
        } = useContext(ctx),
        classes = useStyles(),
        centerVertically = () => dispatch({type: ACTIONS.BULK_CENTER_VERTICALLY}),
        centerHorizontally = () => dispatch({type: ACTIONS.BULK_CENTER_HORIZONALLY}),
        alignVertically = () => {
            dispatch({type: ACTIONS.BULK_ALIGNV});
        },
        alignHorizontally = () => {
            dispatch({type: ACTIONS.BULK_ALIGNH});
        },
        spaceVertically = () => {
            // console.log('space vertically');
            dispatch({type: ACTIONS.BULK_SPACE, payload: 'top' });
        },
        spaceHorizontally = () => {
            // console.log('space horizontally');
            dispatch({type: ACTIONS.BULK_SPACE, payload: 'left' });
        },
        deleteAll = () => {
            // console.log('delete all');
            dispatch({type: ACTIONS.BULK_DELETE });
        },
        actions = [
            {
                name:'center vertically respect selected',
                icon: <AlignVerticalCenterIcon/>,
                onClick: alignVertically
            },{
                name:'center horizontally respect selected',
                icon: <AlignHorizontalCenterIcon/>,
                onClick: alignHorizontally
            },{
                name:'align vertically respect image',
                icon: <BorderHorizontalIcon/>,
                onClick: centerVertically
            },{
                name:'align horizontally respect image',
                icon: <BorderVerticalIcon/>,
                onClick: centerHorizontally
            },{
                name:'space evenly vertically',
                icon: <DensityMediumIcon/>,
                onClick: spaceVertically,
                disabled: selected.length < 3
            },{
                name:'space evenly horizontally',
                icon: <DensityMediumIcon className={classes.Rot}/>,
                onClick: spaceHorizontally,
                disabled: selected.length < 3
            },{
                name:'delete all',
                icon: <DeleteIcon />,
                onClick: deleteAll
            }
        ];
    return <SpeedDial
        direction="left"
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 30, right: 16 }}
        icon={<SpeedDialIcon />}
    >
        {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
                disabled={action.disabled}
            />
        ))}
    </SpeedDial>;
};

export default BulkActions;