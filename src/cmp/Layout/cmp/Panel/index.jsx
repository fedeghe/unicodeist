import Header from './cmp/Header'
import Symbols from './cmp/Symbols'
import useStyles from './styles'

const Panel = () => {
    const classes = useStyles()
    return <div className={classes.Container}>
        <Header/>
        <Symbols/>
    </div>
}
export default Panel