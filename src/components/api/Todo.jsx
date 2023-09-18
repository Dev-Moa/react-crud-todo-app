import React, { useState } from 'react'
import { deleteTodo, createTodo, retrieveListTodos, updateTodo, baseUrl } from '../../api/todos'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import useSWR from 'swr'
import toast, { Toaster } from 'react-hot-toast';

function Todo() {

    //toast

    //take the selected update id
    const [updateId, setUpdatedId] = useState([])

    //toggle when to open update form
    const [selected, setSelected] = useState(false)

    //react-hook-form
    const { register, setValue, handleSubmit, formState: { errors }, } = useForm()

    //swr

    const { data, error, isLoading, mutate } = useSWR(baseUrl, retrieveListTodos)



    // add todo submit
    const handleAddSubmit = async (data) => {
        try {
            //call api function
            await createTodo(data)
            mutate()
            toast.success("added")
        } catch (error) {
            toast.error("failed to add")
            return error.res
        }
    }

    //handleSelectAndPopulate
    const handleSelectAndPopulate = (data) => {
        //selected boolean
        setSelected(!selected)
        setUpdatedId(data.id)
        //populate data
        setValue('title', data.title)

    }

    // handleUpdateSubmit
    const handleUpdateSubmit = async (data) => {
        setSelected(!selected)
        await updateTodo(updateId, data)
        mutate()
        toast.success("data updated")
    }

    //delete

    const handleDelete = async (id) => {
        await deleteTodo(id)
        mutate()
        toast.success("deleted")
    }

    //isLoading and error
    if (isLoading) return <p>loading ...</p>
    if (error) return <p>error happened</p>

    return (
        <div>
            <Toaster />
            {/*  add todo form */}
            <form onSubmit={handleSubmit(handleAddSubmit)} className='mb-12 flex gap-10 items-center' >
                <Label>Title</Label>
                <Input className="w-1/2" {...register("title")} />
                <Button type="submit">Add</Button>
            </form>


            {/* update form */}
            {selected && (<form onSubmit={handleSubmit(handleUpdateSubmit)} className='flex mb-10 gap-10 items-center' >
                <Button type="submit" >Update</Button>

            </form>)}


            {/* list todo */}
            {data.map((data) => (
                <div key={data.id} className='flex items-center justify-between space-y-10'>
                    <li> {data.title} </li>
                    <div className='space-x-10'>
                        <Button onClick={() => handleSelectAndPopulate(data)} > Edit </Button>
                        <Button onClick={() => handleDelete(data.id)} >Delete</Button>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default Todo