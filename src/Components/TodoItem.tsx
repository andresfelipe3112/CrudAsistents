
import "../archivosSCSS/TodoItem.scss"
import { useEffect, useState } from 'react';
import axios from "axios";
import { Todo } from "../interface_tsx/interface"



export default function TodoItem({ todos, onSelectLanguage }: any,) {



    // useState
    const [data, setData] = useState("");
    const [bolenor, setBolenor] = useState(false);


    //function  
    const handleLanguageTwo = () => { // bollean que actuliza el estado si cambia
        onSelectLanguage(bolenor);
    }


    const changueComplete = (e: any) => {

        //itera por la data  y extrae la realcion con los div
        let elemetPUT: any = todos.todos.filter((x: Todo) => x.id === e.target.parentNode.parentNode.id);

        let isCompleted = {
            isCompleted: elemetPUT[0].isCompleted === false ? true : false,
        }
        let newObj: {} = { ...elemetPUT[0], ...isCompleted }


        // genera la peticion con el id encontrado en la anterior iteracion
        axios({
            method: 'PUT',
            url: `https://todos-go.herokuapp.com/api/todos/${e.target.parentNode.parentNode.id}`,
            data: JSON.stringify(newObj),
        }).then((response) => {

            if (bolenor === false) {
                setBolenor(true)
            } else {
                setBolenor(false)
            }
            console.log("put ok");
            console.log(response);
        }, (error) => {
            console.log(error);
        });


        //Modifica el botton

        if (e.target.parentElement.className === "checkbox-JASoftoff") {
            e.target.parentElement.className = "checkbox-JASofton";
            e.target.parentElement.style.backgroundColor = "green";
            e.target.parentElement.previousSibling.innerText = "Complete"
        } else {
            e.target.parentElement.className = "checkbox-JASoftoff";
            e.target.parentElement.style.backgroundColor = "gray";
            e.target.parentElement.previousSibling.innerText = "InComplete"
        }
    }


    //Boton Detele
    const deleteButton = (e: any) => {

        axios({
            method: 'DELETE',
            url: `https://todos-go.herokuapp.com/api/todos/${e.target.parentElement.id}`,
        }).then((response) => {
            console.log("Deleteo ok");
            if (bolenor === false) {
                setBolenor(true)
            } else {
                setBolenor(false)
            }
            return response
        }, (error) => {
            console.log(error);
        });
    }





    useEffect(() => {

        setData(todos.todos);
        handleLanguageTwo()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos, bolenor])







    return (
        <div className="ContaineTodoItem">
            <div className="tableTOP">
                <h5>NAME</h5>
                <h5>TASK</h5>
                <h5 id="status">   STATUS</h5>

            </div>

            {
                data ? todos.todos.map(({ student, task, isCompleted, id }: any) =>
                    <div key={id} id={id} className="table">
                        <h5>{student}</h5>
                        <h5>{task}</h5>

                        <button onClick={deleteButton}>Delete</button>
                        <button className="btn-grad">{isCompleted ? "Complete" : "inComplete"}</button>
                        <div className={isCompleted ? "checkbox-JASofton" : "checkbox-JASoftoff"}>
                            <div onClick={changueComplete} id="checkAvanzado"></div>
                            <label htmlFor="checkAvanzado"></label>
                        </div>


                    </div>

                ) : null
            }




        </div>
    )
}

