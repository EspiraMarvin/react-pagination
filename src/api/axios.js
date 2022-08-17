import axios from 'axios'

// axios instance with baseURL for jsonplaceholder fake api
export const axiosOne = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

// get posts page, if a page number is not passed it defaults to 1
export const getPostsPage = async(pageParam = 1) => {
    const response = await axiosOne.get(`/posts?_page=${pageParam}`)
    return response.data
}

// axios instance with baseURL for reqres.in fake api
export const axiosTwo = axios.create({
    baseURL: 'https://reqres.in/api'
})

//get users page
export const getUsersPage = async (pageParam = 1) => {
    const response = await axiosTwo.get(`/users?page=${pageParam}`)
    return response.data
}