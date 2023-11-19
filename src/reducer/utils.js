import {
    LOCALSTORAGE_KEYFRAMES_KEY,
} from 'src/constants';


export const keyFramesManager = {
    synch : toWrite => 
        toWrite
            ? localStorage.setItem(LOCALSTORAGE_KEYFRAMES_KEY, JSON.stringify(toWrite))
            : JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYFRAMES_KEY) || '{}')
};


const exp = {
    keyFramesManager
};

export default exp;