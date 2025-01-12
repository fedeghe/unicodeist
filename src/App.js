import { useReducer, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'react-jss';
import { ThemeProvider as MThemeProvider, createTheme } from '@mui/material/styles';
import Context from './Context';

import Layout from './cmp/Layout';
import reducerFactory from './reducer';
import ACTIONS from './reducer/actions';
import getTheme from './themes';
import { debounce } from './utils';

const { reducer, init } = reducerFactory();
const App = () => {
    const [state, dispatch] = useReducer(reducer, {}, init),
        { themeKey, preventReload } = state,
        browser = (() => {
            if (window.safari !== undefined) return 'safari';
            return null;
        })(),
        theme = getTheme(themeKey),
        debounced = debounce(
            () => dispatch({ type: ACTIONS.INIT_VIEWPORT }), 500
        ),
        catchReload = useCallback(e => {
            e.preventDefault();
            e.returnValue = '';
        }, []),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        storeViewPortData = useCallback(debounced, []),
        prevent = useCallback(e => e.preventDefault(), []),
        mtheme = createTheme({ palette: { mode: themeKey } });

    useEffect(storeViewPortData, [storeViewPortData]);
    useEffect(() => {
        window.addEventListener("resize", storeViewPortData);
        window.addEventListener("scroll", prevent);
        window.addEventListener("keydown", e => {
            if(e.key === 's' && e.metaKey){
                e.preventDefault();
                return false;
            }
        });
        if (preventReload) {
            window.addEventListener("beforeunload", catchReload);
            window.addEventListener("popstate", catchReload);
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
        }

        return () => {
            window.removeEventListener("resize", storeViewPortData);
            window.removeEventListener("scroll", prevent);
            if (preventReload) {
                window.removeEventListener("beforeunload", catchReload);
                window.removeEventListener("popstate", catchReload);
            }
        };
    }, [storeViewPortData, preventReload, prevent, catchReload]);

    return (
        <MThemeProvider theme={mtheme}>
            <ThemeProvider theme={theme}>
                <Context.Provider value={{ state, dispatch, browser }}>
                    <Layout />
                </Context.Provider>
            </ThemeProvider>
        </MThemeProvider>
    );
};

export default App;
