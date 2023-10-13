import { useContext} from 'react';
import Sym from './Sym';
import ctx from '../../../../../../Context';

import useStyles from './styles';

const Symbols = () => {
    const classes = useStyles(); 
    const {state: {
        symbols, symbolsFilter,
        focusedSymbolId
    }} = useContext(ctx);

    return <div className={classes.Container}>{
        symbols.filter(
            sym => sym.label.toLowerCase().includes(symbolsFilter.toLowerCase())
                || sym.id === focusedSymbolId
        ).map(sym =>
            <Sym key={sym.id} sym={sym}/>
        )
    } </div>;
};
export default Symbols;