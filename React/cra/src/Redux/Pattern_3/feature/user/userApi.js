export const userCall = (param) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if((/[A-Za-z]/g.test(param)))
                resolve(param);
            else
                reject('error');
        }, 1000)
    })
}
