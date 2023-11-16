/* eslint-disable no-unused-vars */
import useStyles from './styles';
import Header from './cmp/Header';
import Families from './cmp/Families';

const AsciiSelector = () => {
    const classes = useStyles();
    return <div className={classes.Container}>
        <Header />
        <Families/>
    </div>;
};
export default AsciiSelector;