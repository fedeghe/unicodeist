import { useReducer, useEffect, useCallback } from 'react';
import { ThemeProvider} from 'react-jss';

import {getMaxHeight, getMaxWidth} from 'src/constants';
import Layout from './cmp/Layout';
import Context from './Context';
import reducerFactory from './reducer';
import ACTIONS from './reducer/actions';
import getTheme from './themes';
import {debounce} from './utils';

const {reducer, init} = reducerFactory();
const App = () => {
    const [state, dispatch] = useReducer(reducer, {}, init),
        {themeKey} = state,
        browser = (() => {
            if (window.safari !== undefined) return 'safari';
            return null;
        })(),
        theme = getTheme(themeKey),
        debounced = debounce(
            () => dispatch({
                type: ACTIONS.INIT_VIEWPORT,
                payload: {
                    maxHeight: getMaxHeight(),
                    maxWidth: getMaxWidth(),
                }
            }), 500
        ),
        // catchReload = useCallback(e => {
        //     e.preventDefault();
        //     e.returnValue = '';
        // }, []),
        storeViewPortData = useCallback(debounced, []),
        prevent = useCallback(e => e.preventDefault(), []);
    useEffect(storeViewPortData, [storeViewPortData]);
    useEffect(() => {
        // window.addEventListener("beforeunload", catchReload);
        window.addEventListener("resize", storeViewPortData);
        window.addEventListener("scroll", prevent);
        
        // history.pushState(null, null, location.href);
        // window.onpopstate = function () {
        //     history.go(1);
        // };
        
        return () => {
            window.removeEventListener("resize", storeViewPortData);
            window.removeEventListener("scroll", prevent);
            // window.removeEventListener("beforeunload", catchReload);
        };
    }, [storeViewPortData]);
    
    return (        
        <ThemeProvider theme={theme}>
            <Context.Provider value={{state, dispatch, browser}}>
                <Layout/>
            </Context.Provider>
        </ThemeProvider>
    );
};

export default App;
