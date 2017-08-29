function resolveIn2Seconds(x) {
    return new Promise(resolve=>{
        console.log('resolving: ', x);
        setTimeout(()=>{
            resolve(x);
        }, 2000);
    });
}

async function runIt(){
    let set = []
    for(let i = 60;i>=0;i-=10) {
        set.push(resolveIn2Seconds(i).then((v)=>10+v));
    }
    return Promise.all(set);
}

runIt().then((val)=>{
    console.log(val);
});