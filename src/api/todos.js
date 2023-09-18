import axios from "axios";

export const baseUrl = "https://64ed97871f87218271416e60.mockapi.io/api/v1/todos/"

// create todo

export const createTodo = async (data) => {
    try {
        const response = await axios.post(baseUrl, data)
        return response.data
    } catch (error) {
        return error.response
    }
}

// retrieve list 
export const retrieveListTodos = async () => {
    try {
        const res = await axios.get(baseUrl)
        return res.data
    } catch (error) {
        return error.res
    }
}

// retrieve single todo

export const retrieveSingleTodo = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}${id}/`)
        return res.data
    } catch (error) {
        return error.res
    }
}

// update single todo

export const updateTodo = async (id, data) => {
    try {
        const response = await axios.put(`${baseUrl}${id}`, data)
        return response.data
    } catch (error) {
        return error.response
    }
}
// delete single todo

export const deleteTodo = async (id, data) => {
    try {
        const response = await axios.delete(`${baseUrl}${id}`)
        return response.data
    } catch (error) {
        return error.response
    }
}