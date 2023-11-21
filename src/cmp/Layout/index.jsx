import useStyles from './styles';
import {
    Panel, Main 
} from './cmp';

const Layout = () => {
    const classes = useStyles();
    return (
        <div className={classes.Root}>
            <Main />
            <Panel />
        </div>
    );
};
export default Layout;