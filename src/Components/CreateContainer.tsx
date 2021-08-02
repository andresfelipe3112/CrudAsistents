import React, { useState, useEffect } from 'react';

import { useForm } from "react-hook-form";
import "../archivosSCSS/CreateContainer.scss"
import axios from "axios";

export default function CreateContainer(prop: any) {


    //interface TypeScript
    interface data {
        student: string | null,
        task: string | null,
    }

    //useState

    const [datainput, setDatainput] = useState((prevState: any) => prevState)
    const { register, handleSubmit, formState: { errors } } = useForm()



    //funtion
    const onSubmit = (data: data, e: any) => {

        let obj = {
            key: (Math.floor(Math.random() * (10000000 - 150000)) + 150000).toString(),
            isCompleted: false,
        }

        e.preventDefault()
        e.target.reset()

        setDatainput((prevState: any) => {
            return prevState = { ...data, ...obj };
        });
    }

    // crear APi
    const sendstudent = async (datainput: any) => {
        axios({
            method: 'POST',
            url: 'https://todos-go.herokuapp.com/api/todos',
            data: JSON.stringify(datainput)
        }).then((response) => {
            handleLangChange()
            return response
        }, (error) => {
            console.log(error);
        });
    }



    const handleLangChange = () => {
        prop.onSelectLanguage(datainput);
    }




    useEffect(() => {
        if (datainput) {
            sendstudent(datainput)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datainput])





    return (
        <div className="CreateContainer">

            <h2>Ingresa nuevo estudiante</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label>
                    Name:
                    <input

                        placeholder="student´s name"
                        {...register("student", { required: true, maxLength: 20 })} />

                    {/* genera el error si no se cumple con el formulario */}
                    <span className="text-danger">
                        {errors.firstName?.type === 'required' && "First name is required"}
                    </span>
                </label>


                <label>
                    Task:
                    <input
                        placeholder="task"
                        {...register("task", { required: true, maxLength: 20 })} />

                    {/* genera el error si no se cumple con el formulario */}
                    <span className="text-danger text-small d-block mb-2">
                        {errors.firstName?.type === 'required' && "First name is required"}
                    </span>
                </label>

                <button className="btn draw-border"
                    type="submit"
                >
                    Agregar
                </button>

            </form>
        </div>
    )
}
