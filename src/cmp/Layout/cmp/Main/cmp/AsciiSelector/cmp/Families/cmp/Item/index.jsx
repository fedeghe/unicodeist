import useStyles from './styles';
const Item = ({char, onSelect}) => {
    const classes = useStyles();
    const onClick = () => onSelect(char);
    return <div className={classes.Item} onClick={onClick}>{char}</div>;
};
export default Item;