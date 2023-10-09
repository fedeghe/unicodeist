import {useState, useEffect} from 'react';
const useFilter = ({allSymbols, filter}) => {
    const [symbols, setSymbols] = useState(allSymbols);

    useEffect(() => {
        setSymbols(filter
            ? allSymbols.map(
                ({label, data}) => {
                    const filteredData = data.filter(
                        ({char, description = ''}) => 
                            description.toLowerCase()
                                .split(',')
                                .some(s => s.includes(filter))
                            || char === filter
                    );
                    return filteredData.length && {
                        label, 
                        data:filteredData
                    };
                }
            ).filter(Boolean)
            : allSymbols
        );
        return () => setSymbols(allSymbols);
    }, [filter]);
    return { symbols };
};
export default useFilter;