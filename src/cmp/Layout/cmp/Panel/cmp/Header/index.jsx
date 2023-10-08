import Icons from './../Icons';
import Sizes from './../Sizes';
import Logo from './cmp/Logo';
import useStyles from './styles';


const Header = () => {
    const classes = useStyles();
    
    return <>
        <div className={classes.PanelHeader}>
            <Logo/>
            <Icons />
        </div>
        <hr className={classes.Hr} />
        <Sizes/>
    </>;
};

export default Header;