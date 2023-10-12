import { useReducer, useEffect, useCallback } from 'react';
import { ThemeProvider} from 'react-jss';

import Layout from './cmp/Layout';
import Context from './Context';
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
        () => dispatch({
            type: ACTIONS.INIT_VIEWPORT,
            payload: {
                maxHeight: ~~window.innerHeight * 0.9,
                maxWidth: ~~window.innerWidth * 0.9,
            }
        }), 500
    );
    const storeViewPortData = useCallback(debounced, []);
    // const catchReload = useCallback(e => {
    //     e.preventDefault();
    //     e.returnValue = '';
    // }, []);
    useEffect(storeViewPortData, [storeViewPortData]);
    useEffect(() => {
        // window.addEventListener("beforeunload", catchReload);
        window.addEventListener("resize", storeViewPortData);
        
        // history.pushState(null, null, location.href);
        // window.onpopstate = function () {
        //     history.go(1);
        // };
        
        return () => {
            window.removeEventListener("resize", storeViewPortData);
            // window.removeEventListener("beforeunload", catchReload);
        };
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
