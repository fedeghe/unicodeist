export const uniqueID = new function () {
    var count = 0,
        self = this;
    this.prefix = 'ASCIIST_';
    this.toString = function () {
        count += 1;
        return self.prefix + count;
    };
}();
export const debounce = (func, delay) => {
    var to,
        ret = function () {
            var args = [].slice.call(arguments),
                self = this;
            clearTimeout(to);
            to = setTimeout(function (){
                return func.apply(self, args);
            }, delay);
        };
    ret.cancel = function () {
        clearTimeout(to);
    };
    return ret;
}
const def = {
    uniqueID,
    debounce
}
export default def