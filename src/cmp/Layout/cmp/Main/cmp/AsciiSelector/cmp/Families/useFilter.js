import {useState, useEffect, useMemo} from 'react';
import { getCodes } from './../../../../../../../../utils';
const useFilter = ({allSymbols, filter}) => {    
    const [symbols, setSymbols] = useState(allSymbols),
        lcFilter =`${filter}`.toLowerCase(),
        filteredSymbols = useMemo(() => 
            filter
                ? allSymbols.map(({label, data}) => {
                    const newData = data.map(({title, charSet}) => {
                        const filteredCharset = charSet.filter(
                            ({c: char, d: description = ''}) => {
                                const der = getCodes(char);
                                return false 
                                    || description.toLowerCase().split(',').some(s => s.includes(lcFilter))
                                    || `${char}`.toLowerCase() === lcFilter
                                    || `${label}`.toLowerCase().includes(lcFilter)
                                    || `${der.decimal}` === lcFilter
                                    || `${der.octal}` === lcFilter
                                    || `${der.hex}` === lcFilter
                                    || `${der.unicode}` === lcFilter;
                            }
                        );
                        return filteredCharset.length && {
                            title,
                            charSet: filteredCharset
                        };
                    }).filter(Boolean);
                    return newData.length && {
                        label,
                        data: newData
                    };
                }).filter(Boolean)
                : allSymbols, 
            [filter]
        );

    useEffect(() => {
        setSymbols(filteredSymbols);
        return () => setSymbols(allSymbols);
    }, [lcFilter, filteredSymbols]);

    return symbols;
};
export default useFilter;