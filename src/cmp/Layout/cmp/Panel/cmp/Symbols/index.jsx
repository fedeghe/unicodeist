import { useContext} from 'react';

import Sym from './Sym';
import ctx from 'src/Context';
import useStyles from './styles';

const Symbols = () => {
    const {
            state: {
                symbols, symbolsFilter,
                focusedSymbolId,
                canScrollSymbols
            }
        } = useContext(ctx),
        classes = useStyles({canScrollSymbols});

    return <div className={classes.Container}>{
        symbols.filter(
            ({ label, id }) =>
                label.toLowerCase().includes(symbolsFilter.toLowerCase())
                || id === focusedSymbolId
        ).map(sym =>
            <Sym key={sym.id} sym={sym}/>
        )
    } </div>;
};
export default Symbols;