export const uniqueID = new function () {
    var count = 0,
        self = this;
    this.prefix = 'UNICODEIST_';
    this.toString = function () {
        count += 1;
        return self.prefix + count;
    };
}();

export const cleanCode = code => code
    .replace(/class="[^"]*"/mg, '')    // remove class
    .replace(/droppable="droppable"/mg, '')    // remove droppable
    .replace(/\s{2,}/gm, ' ')           // remove double spaces
    .replace(/:\s/gm, ":")             // remove spaces after :
    .replace(/;\s/gm, ";")             // remove spaces after ;
    .replace(/,\s/gm, ",")              // remove spaces after ,
    .replace(/draggable=[true|false]/gm, "");              // remove draggable attrs

export const debounce = (func, delay) => {
    var to,
        ret = function () {
            var args = [].slice.call(arguments),
                self = this;
            clearTimeout(to);
            to = setTimeout(function () {
                return func.apply(self, args);
            }, delay);
        };
    ret.cancel = function () {
        clearTimeout(to);
    };
    return ret;
};

/**
 * TODO: here I should allow the use to see the location & name dialog
 * but still do not know how
 */
export const saveAsFile = (filename, data) => {
    const blob = new Blob([JSON.stringify(data)]),
        link = document.createElement("a");
    link.download = filename;
    // link.toggleAttribute('download');
    
    link.href = window.URL.createObjectURL(blob);
    link.click();
};
export const importFromFile = ({onContentReady}) => {
    const link = document.createElement("input");
    link.type = 'file';
    link.addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function() {
            onContentReady(reader.result);
        };
        if (e.target.files.length) {
            reader.readAsText(e.target.files[0]);
        }
    });
    link.click();
};

const getUnicodeistData = j => JSON.stringify({
    sty: {
        w: j.width, //px
        h: j.height, //px
        bgc: j.backgroundColor,
        // position:'relative'
    },
    sym: j.symbols.map(s =>({
      cnt: s.char,
      sty: {
        // position:'absolute',
        zi: s.zIndex,
        c: s.color,
        // fs: s.fontSize, //px
        ff: s.fontFamily,
        fw: s.fontWeight,
        o: s.opacity,
        // 'transform-origin': 'center center', 
        t: {
            trn:[s.left, s.top],
            ...(s.scale && {s: s.scale}),
            ...(s.scaleX && {sy: s.scaleX}),
            ...(s.scaleY && {sy: s.scaleY}),
            ...(s.rotationX && {rx: s.rotationX}), // deg
            ...(s.rotationY && {ry: s.rotationY}), // deg
            ...(s.rotationZ && {rz: s.rotationZ})  // deg
        },
      }
    }))
});

export const getUnicodeistScriptTag = state => {
    const dataUnicodeist = getUnicodeistData(state);
    return `<script src="https://www.jmvc.org/unicodeist/index.js" data-unicodeist='${dataUnicodeist}'></script>`;
};

const def = {
    uniqueID,
    cleanCode,
    debounce,
    saveAsFile,
    importFromFile,
    getUnicodeistData,
    getUnicodeistScriptTag
};
export default def;