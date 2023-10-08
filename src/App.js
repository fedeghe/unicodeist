
import { useReducer, useEffect, useCallback } from 'react';
import reducerFactory from './reducer';
import ACTIONS from './reducer/actions';
import getTheme from './themes';
import {debounce} from './utils';


const {reducer, init} = reducerFactory();
const App = () => {
    const [state, dispatch] = useReducer(reducer, {}, init);
    const {themeKey} = state;
    const theme = getTheme(themeKey);
    const debounced = debounce(
        () => {
            // console.log({innerHeight: ~~window.innerHeight, innerWidth: ~~window.innerWidth});
            dispatch({
                type: ACTIONS.INIT_VIEWPORT,
                payload: {
                    maxHeight: ~~window.innerHeight * 0.9,
                    maxWidth: ~~window.innerWidth * 0.9,
                }
            });
        }, 500
    );
    const storeViewPortData = useCallback(debounced, []);
    useEffect(storeViewPortData, [storeViewPortData]);
    useEffect(() => {
        window.addEventListener("resize", storeViewPortData);
        return () => window.removeEventListener("resize", storeViewPortData);
    }, [storeViewPortData]);
    
    return (        
        <ThemeProvider theme={theme}>
            <Context.Provider value={{state, dispatch}}>
                <Layout/>
            </Context.Provider>
        </ThemeProvider>
    );
};

export default App;
