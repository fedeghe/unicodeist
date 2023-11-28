(function () {
    var cleanKf = function(kf) {
            return kf
                .replace(/^\{/, '')
                .replace(/\}$/, '')
                .replace(/\/\/.*/g, '')
                .replace(/\n/g, '');
        },
        defs = {
            w: 500,
            h: 500,
            bgc: '#FFFFFF',
            c: '#000000',
            ff: 'Verdana',
            fw: '400',
            fs : '20px'
        },
        script = document.currentScript,
        /* returns root or symbol */
        createElement = function (d) {
            var isRoot = 'sym' in d,
                mergeDasDb = function (ast, bl){
                    if (ast) {
                        var _ast = cleanKf(ast);
                        return bl
                            ? (_ast.includes('filter:'))
                                ? _ast.replace('filter:', 'filter: blur(' + bl + 'px)')
                                : _ast + 'filter:blur(' + bl + 'px)'
                            : _ast;
                    }
                    return bl && 'filter:blur('+bl+'px)';
                },
                node = document.createElement('div'),
                // just to save few bytes I'll not map repeated strings
                styles = isRoot
                    ? [
                        d.bgs && cleanKf(d.bgs),
                        'width:'+(d.w || defs.w) + 'px',
                        'height:'+(d.h || defs.h) + 'px',
                        'background-color:' + (d.bgc || defs.bgc) + (d.bgca ? '00' : ''),
                        'position:relative;overflow:hidden;pointer-events:none',
                    ]
                    : [
                        'z-index:' + d.zi,
                        'color:' + (d.c || defs.c),
                        'font-family:' + (d.ff || defs.ff) ,
                        'font-weight:' + (d.fw || defs.fw) ,
                        'font-size:' + defs.fs + ';position:absolute;transform-origin:center center',
                        (d.o !== 1 && 'opacity:'+d.o),
                        mergeDasDb(d.as, d.b),
                        'transform:' + [
                            'translate('+d.l+'px,'+d.t+'px)',
                            d.s && d.s!==1 && 'scale(' + d.s +  ')',
                            d.sx && d.sx!==1 && 'scaleX(' + d.sx +  ')',
                            d.sy && d.sy!==1 && 'scaleY(' + d.sy +  ')',
                            d.rx && 'rotateX(' + d.rx +  'deg)',
                            d.ry && 'rotateY(' + d.ry +  'deg)',
                            d.rz && 'rotateZ(' + d.rz +  'deg)',
                            (d.skx || d.sky) && 'skew('+(d.skx||0)+'deg,'+(d.sky||0)+'deg)'
                        ].filter(Boolean).join(' ')
                    ];

            node.setAttribute('style', styles.filter(Boolean).join(';'));
            d.ch && (node.innerHTML = d.ch);
            return node;
        },
        rawData = script.dataset.unicodeist,
        data = JSON.parse(rawData),
        root = createElement(data);

    for(var k in data.kf) {
        var s = document.createElement('style');
        s.innerHTML = data.kf[k];
        root.appendChild(s);
    }
    // append children
    data.sym.forEach(function (symbol) {
        root.appendChild(
            createElement(symbol)
        );
    });
    script.parentNode.insertBefore(root, script.nextSibling);
    script.parentNode.removeChild(script);
})();