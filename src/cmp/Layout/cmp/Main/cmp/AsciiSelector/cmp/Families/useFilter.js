import {useState, useEffect, useMemo} from 'react';
const useFilter = ({allSymbols, filter}) => {
    
    const [symbols, setSymbols] = useState(allSymbols);
    const lcFilter =`${filter}`.toLowerCase();

    const filteredSymbols = useMemo(() => {
        return filter
            ? allSymbols.map(({label, data}) => {
                const newData = data.map(({title, charSet}) => {
                    const filteredCharset = charSet.filter(
                        ({char, description = ''}) => false 
                            || description.toLowerCase().split(',').some(s => s.includes(lcFilter))
                            || `${char}`.toLowerCase() === lcFilter
                            // || `${title}`.toLowerCase().includes(lcFilter)
                            || `${label}`.toLowerCase().includes(lcFilter)
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
            : allSymbols;
    }, [filter]);

    useEffect(() => {
        setSymbols(filteredSymbols);
        return () => setSymbols(allSymbols);
    }, [lcFilter, filteredSymbols]);
    
    return symbols;
};
export default useFilter;