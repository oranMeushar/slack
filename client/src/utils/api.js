

export const post = async(endPoint, content, header=null) => {
    let url = `http://localhost:8080/${endPoint}`;
    let headers = {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
    if(header){
        headers.Authorization = `Bearer ${header}`
    }
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers,
            body:JSON.stringify({...content})
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}


export const patch = async(endPoint, content, header=null) => {
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    let headers = {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
    if(header){
        headers.Authorization = `Bearer ${header}`
    }
    try{
        const result = await fetch(url, {
            method: 'PATCH',
            headers,
            body:JSON.stringify({...content})
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}

export const get = async(endPoint, header=null) => {
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    let headers = {}
    if(header){
        headers.Authorization = `Bearer ${header}`
    }
    try{
        const result = await fetch(url, {
            method: 'GET',
            headers
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}

export const remove = async(endPoint, header=null) => {
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    let headers = {}
    if(header){
        headers.Authorization = `Bearer ${header}`
    }
    try{
        const result = await fetch(url, {
            method: 'DELETE',
            headers
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}