(function () {
    var script = document.currentScript,

        // must be in synch with src/constants.js
        // FONT_FAMILIES_REDUCTION_MAP
        FFRM = {
            ar: 'Arial',
            v: 'Verdana',
            ta: 'Tahoma',
            tr: 'Trebuchet MS',
            tn: 'Times New Roman',
            ge: 'Georgia',
            ga: 'Garamond',
            c: 'Courier New',
            b: 'Brush Script MT'
        },
        lbs = {
            r:'rotate',
            s:'scale',
            f:'font',
            c:'color',
            d:'deg',
            po:'position',
            cn:'center',
            p:'px',
            t:'transform'
        },
        map = {
            w: function (v) { return 'width:' + v + lbs.p; },
            h: function (v) { return 'height:' + v + lbs.p; },
            bgc: function (v) { return 'background-' + lbs.c + ':' + v; },
            zi: function (v) { return 'z-index:' + v; },
            c: function (v) { return lbs.c + ':' + v; },
            ff: function (v) { return lbs.f + '-family:' + FFRM[v]; },
            fw: function (v) { return lbs.f + '-weight:' + v; },
            o: function (v) { return 'opacity:' + v; },
            s: function (v) { return v !== 1 ? lbs.s + '(' + v + ')' : ''; },
            sx: function (v) { return v !== 1 ? lbs.s + 'X(' + v + ')' : ''; },
            sy: function (v) { return v !== 1 ? lbs.s + 'Y(' + v + ')' : ''; },
            rx: function (v) { return v ? lbs.r + 'X(' + v + lbs.d + ')' : ''; },
            ry: function (v) { return v ? lbs.r + 'Y(' + v + lbs.d + ')' : ''; },
            rz: function (v) { return v ? lbs.r + 'Z(' + v + lbs.d + ')' : ''; }
        },
        createElement = function (sty, cnt) {
            var node = document.createElement('div'),
                styles = [cnt
                    ? lbs.po + ':absolute;' + lbs.t + '-origin:' + lbs.cn + ' ' + lbs.cn
                    : lbs.po + ':relative;overflow:hidden'
                ],
                k;

            for (k in sty) {
                if (k === 't') {
                    var trans = [
                        lbs.t + ':translate(' + sty.t.trn[0] + lbs.p + ',' + sty.t.trn[1] + lbs.p + ')'
                    ];
                    's' in sty.t && trans.push(map.s(sty.t.s));
                    'sx' in sty.t && trans.push(map.sx(sty.t.sx));
                    'sy' in sty.t && trans.push(map.sy(sty.t.sy));
                    'sy' in sty.t && trans.push(map.rx(sty.t.rx));
                    'rx' in sty.t && trans.push(map.rx(sty.t.rx));
                    'ry' in sty.t && trans.push(map.ry(sty.t.ry));
                    'rz' in sty.t && trans.push(map.rz(sty.t.rz));
                    styles.push(
                        trans.join(' ') + ';'
                    );
                } else {
                    k in map && styles.push(
                        map[k](sty[k])
                    );
                }
            }
            styles.length && node.setAttribute('style', styles.join(';'));
            cnt && (node.innerHTML = cnt);
            return node;
        },
        rawData = script.dataset.unicodeist,
        data = JSON.parse(rawData),
        root = createElement(data.sty);

    data.sym.forEach(function (symbol) {
        root.appendChild(
            createElement(symbol.sty, symbol.cnt)
        );
    });
    script.parentNode.insertBefore(root, script.nextSibling);
    script.parentNode.removeChild(script);
})();