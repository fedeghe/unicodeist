import useStyles from './styles'
import Panel from './cmp/Panel'
import Main from './cmp/Main'
const Layout = () => {
    
    const classes = useStyles()
    
    return (
        <div className={classes.Root}>
            <Main />
            <Panel />
        </div>
    );
}
export default Layout