import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;

const PARA_API_KEY = "zsp3krDo6e6LX72it7zAzmBT0dwdC3qr";

const paraphraseAPI = axios.create({
    baseURL: "https://api.ai21.com/studio/v1"
})

export function paraphrase(inputText){
    const response = paraphraseAPI.post("/paraphrase", {
        "text": inputText
    }, {
        headers: {
            "Authorization": "Bearer " + PARA_API_KEY
        }
    })
    return response
}

const paperAPI = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export function getUser(id, token){
    console.log(token)
    const response = paperAPI.get('/users/get/' + id, {
        headers:{
            "Authorization": "Bearer " + token
        }
    })
    return response;
}


export function updateInterests(id , value){
    const response = paperAPI.patch('/users/update/' + id, {
        "interests": value
    })

    Cookies.set("interests", value)
    

    return response
}

export function getParaphrase(inputText){
    const response = paperAPI.post("/papers/paraphrase", {
        "inputText": inputText
    })
    return response
}

export function getSession(){
    const response = paperAPI.get('/users')
    return response
}

export function logOut(){
    const response = paperAPI.post('/users/logout')
    return response
}

export function createUser(first_name, last_name, username, email, password){
    const response = paperAPI.post('/users/create', {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password
    })

    console.log(response)
    return response
}

export function searchPapers(query){
    const response = paperAPI.post('/papers/searchPapers', {
        "query": query
    })
    return response
}

export function searchAuthors(author){
    const response = paperAPI.post('/papers/searchAuthors', {
        "author": author
    })
    return response
}

export function getPaper(paperId){
    const response = paperAPI.get('/papers/getPaper/' + paperId)
    return response
}

export function getPapers(paperIds){
    const response = paperAPI.post('/papers/getPapers', {
        "paperIds": paperIds
    })
    return response
}

export function getRecommendations(title){
    const response = paperAPI.post("/papers/getRecommendations", {
        "title": title
    })
    return response
}
export function getInterests(interests){
    const response = paperAPI.post("/papers/getInterests", {
        "interests": interests
    })
    return response
}

export function loginUser(username, password){
    const response = paperAPI.post('/users/login', {
        "username": username,
        "password": password
    })
    return response
}

export function getAuthor(authorId){
    const response = paperAPI.get('/papers/getAuthor/' + authorId)
    return response
}

export function getGraph(paperId){
    const response = paperAPI.get('/graph/buildGraph/' + paperId)
    return response
}

export function updateUser(userId, fn, ln, username, email, password=null){

    let response;
    
    if(password.length == 0){

        response = paperAPI.patch('/users/update/' + userId, {
            "first_name": fn,
            "last_name": ln,
            "username": username,
            "email": email,
        })

    }else{
        response = paperAPI.patch('/users/update/' + userId, {
            "first_name": fn,
            "last_name": ln,
            "username": username,
            "email": email,
            "password": password
        })
    }

    return response

}

export function checkTaken(username){
    const response = paperAPI.post('/users/checkTaken', {
        "username": username
    })

    return response
}

export function getFavorites(userId){
    const response = paperAPI.get('/users/getFavorites/' + userId)
    return response
}

export function getHistory(userId){
    const response = paperAPI.get('/users/getHistory/' + userId)
    return response
}

export function addFavorite(userId, paperId){
    const response = paperAPI.post('/users/addFavorite', {
        paperId: paperId,
        userId: userId
    })

    return response
}

export function removeFavorite(userId, paperId){
    const response = paperAPI.post('/users/removeFavorite', {
        userId: userId,
        paperId: paperId
    })
    return response
}

export function removeHistory(userId, paperId){
    const response = paperAPI.post('/users/removeHistory', {
        userId: userId,
        paperId: paperId
    })
    return response
}

export function addHistory(userId, paperId){
    const response = paperAPI.post('/users/addHistory', {
        paperId: paperId,
        userId: userId
    })

    return response;
}