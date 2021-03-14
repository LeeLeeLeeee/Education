import axios from 'axios'

function makeConfig(methodType){
    let link = 'https://reqres.in/api/';
    let method = '';
    let data = {};
    let headers = { 'Content-Type': 'application/json' }
    switch(methodType){
        case "GET":
            link += 'users?page=1'
            method = 'get'
            break;
        case "POST":
            link +='users'
            method = 'post'
            data = {name:'yhlee', 'job':'leader'}
            break;
        case "WAIT":
            link += 'users?delay=5'
            method = 'get'
            break;
        case "ERROR":
            link += 'user/23'
            method = 'get'
            break;
        default:
            break;
    }
    return {
        link,
        data,
        headers,
        method
    }

}

export default function asyncApi(prop, library){
    const {
        method,
        data,
        headers,
        link
    } = makeConfig(prop.type)
    return new Promise((resolve, reject)=>{
        if(library === 'axios'){
            let axiosConfig = {
                method,
                headers,
                data,
                timeout:2000
            }
            axios[method](link, axiosConfig)
            .then(response=>{
                resolve(response.data.data || response.data)
            })
            .catch(err=>{
                reject(new Error(err))
            })
        } else {
            fetch(link, {
              method,
              [method === "get" ? "" : 'body']: JSON.stringify(data),
              headers:headers,
            })
              .then((response) => {
                
                if(response.status === 404)
                    throw new Error('404 Error')

                return response.json()
              })
              .then((response) => {
                  
                resolve(response.data || response)
              })
              .catch((err) => {
                reject(new Error(err))
              });
        }
    })
}