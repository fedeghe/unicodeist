
export const cleanCode = code => code
    .replace(/class\="[^"]*"/mg, '')    // remove class
    .replace(/droppable\="droppable"/mg, '')    // remove droppable
    .replace(/\s{2,}/gm, ' ')           // remove double spaces
    .replace(/\:\s/gm, ":")             // remove spaces after :
    .replace(/\;\s/gm, ";")             // remove spaces after ;
    .replace(/,\s/gm, ",")              // remove spaces after ,
    

const exp = {
    cleanCode
}

export default exp