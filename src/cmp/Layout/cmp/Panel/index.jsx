import Header from './cmp/Header';
import Symbols from './cmp/Symbols';
import Search from './cmp/Search';
import useStyles from './styles';

const Panel = () => {
    const classes = useStyles();
    return <div className={classes.Container}>
        <Header/>
        <Search/>
        <Symbols/>
    </div>;
};
export default Panel;