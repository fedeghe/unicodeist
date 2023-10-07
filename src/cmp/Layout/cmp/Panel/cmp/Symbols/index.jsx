import { useContext} from 'react'
import Sym from './Sym'
import ctx from '../../../../../../Context'

import useStyles from './styles'

const Symbols = () => {
    const classes = useStyles() 
    const {state: {symbols}} = useContext(ctx)

    return <div className={classes.Container}>{
        symbols.map(sym =>
            <Sym key={sym.id} sym={sym}/>
        )
    } </div>
}
export default Symbols