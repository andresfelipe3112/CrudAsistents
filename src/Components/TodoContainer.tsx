import { useState, useEffect } from 'react';
import CreateContainer from './CreateContainer';
import ContainerCompleteIncomplete from "./ContainerCompleteIncomplete"
import TodoItem from './TodoItem';
import axios from "axios";
import "../archivosSCSS/TodoContainer.scss"
import { data } from "../interface_tsx/interface"



export default function TodoContainer() {


    //UseSatate

    const [dataInput, setdataInput] = useState({
        student: "",
        task: ""
    })

    const [todos, setTodos] = useState({});
    const [actualizacion, setactualizacion] = useState(true)



    //function

    const handleLanguage = (input: data) => {
        setdataInput(input);
    }

    const handleLanguageTwo = (boleanor: boolean) => { //actualiza el componente con cada cambio
        setactualizacion(boleanor)
    }

    const handleLanguageOne = (boleanor: boolean) => {
        setactualizacion(boleanor)
    }


    //useEffect

    useEffect(() => {
        if (dataInput) {
        } axios({
            method: 'get',
            url: 'https://todos-go.herokuapp.com/api/todos',
        }).then((response) => {
            setTodos(response.data);
        }, (error) => {
            console.log(error);
        });
    }, [dataInput])



    //actualiza el estado segúin el estate actualización
    useEffect(() => {
        if (actualizacion === false || actualizacion === true) {
        } axios({
            method: 'get',
            url: 'https://todos-go.herokuapp.com/api/todos',
        }).then((response) => {
            setTodos(response.data);

        }, (error) => {
            console.log(error);
        });

    }, [actualizacion])



    return (
        <div className="container">

            <div className="container1">
                <CreateContainer onSelectLanguage={handleLanguage} />
                <TodoItem todos={todos} onSelectLanguage={handleLanguageTwo} />
            </div>

            <div className="container2">
                <ContainerCompleteIncomplete actualizacion={actualizacion} todos={todos} onSelectLanguageOne={handleLanguageOne} />
            </div>

        </div>

    )
}




