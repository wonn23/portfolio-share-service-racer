

export function validationParams(params){
    for(let i =0;i<params.length;i++){
        if(params[i] == ''){
            return false;
        }
        return true;
    }
}