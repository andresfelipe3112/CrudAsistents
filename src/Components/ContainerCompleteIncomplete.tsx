import "../archivosSCSS/ContainerCompleteIncomplete.scss"
import { useEffect, useState } from 'react';
import axios from "axios";



export default function ContainerCompleteIncomplete({ actualizacion, todos, onSelectLanguageOne }: any,) {


    //interface TypeScript
    interface Todo {
        id: string;
        task: string;
        student: string;
        isCompleted: boolean;
        version: number;
    }

    //useState
    const [data, setData] = useState("");
    const [bolenor, setBolenor] = useState(false);



    //funtion
    const handleLanguageOne = () => {
        onSelectLanguageOne(bolenor);
    }


    const changueComplete = (e: any) => {
        let elemetPUT: any = todos.todos.filter((x: Todo) => x.id === e.target.parentNode.parentNode.id);

        let isCompleted = {
            isCompleted: elemetPUT[0].isCompleted === false ? true : false,
        }

        let newObj: {} = { ...elemetPUT[0], ...isCompleted }


        //llamada API
        axios({
            method: 'PUT',
            url: `https://todos-go.herokuapp.com/api/todos/${e.target.parentNode.parentNode.id}`,
            data: JSON.stringify(newObj),
        }).then((response) => {
            console.log("put ok");
            if (bolenor && actualizacion === false) {
                setBolenor(true)
            } else {
                setBolenor(false)
            }

            console.log(response);
        }, (error) => {
            console.log(error);
        });

        // cambio segun actulizacion del DOM
        if (e.target.parentElement.className === "checkbox-JASoftoff1") {
            e.target.parentElement.className = "checkbox-JASofton1";
            e.target.parentElement.style.backgroundColor = "green";
            e.target.parentElement.previousSibling.innerText = "Complete"
        } else {
            e.target.parentElement.className = "checkbox-JASoftoff1";
            e.target.parentElement.style.backgroundColor = "gray";
            e.target.parentElement.previousSibling.innerText = "InComplete"
        }
    }


    // Delete item API
    const deleteButton = (e: any) => {

        axios({
            method: 'DELETE',
            url: `https://todos-go.herokuapp.com/api/todos/${e.target.parentElement.id}`,
        }).then((response) => {
            console.log("Deleteo ok");
            if (bolenor && actualizacion === false) {
                setBolenor(true)
            } else {
                setBolenor(false)
            }
            return response
        }, (error) => {
            console.log(error);
        });
    }




    //useEfect para actulizar en tiempo real el dom cualquier cambio
    useEffect(() => {

        setData(todos.todos);
        handleLanguageOne()

        if (actualizacion || bolenor === false) {
            setBolenor(true)
        } else {
            setBolenor(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos])





    return (

        <>

            <div className="ContaineTodoItem1">
                <div className="tableTOP1">

                    <h5 id="status1"> TASK STUDENT COMPLETE</h5>

                </div>

                {
                    data && todos.todos.map(({ student, task, isCompleted, id }: any) =>
                        isCompleted ?
                            <div key={id} id={id} className="table1">
                                <h5>{student}</h5>
                                <h5>{task}</h5>

                                <button onClick={deleteButton}>Delete</button>
                                <button className="btn-grad1">{isCompleted ? "Complete" : "inComplete"}</button>
                                <div className={isCompleted ? "checkbox-JASofton1" : "checkbox-JASoftoff1"}>
                                    <div onClick={changueComplete} id="checkAvanzado1"></div>
                                    <label htmlFor="checkAvanzado"></label>
                                </div>

                            </div>
                            :
                            null
                    )
                }
            </div>




            <div className="ContaineTodoItem1">
                <div className="tableTOP1">

                    <h5 id="status1"> TASK STUDENT INCOMPLETE</h5>

                </div>

                {
                    data && todos.todos.map(({ student, task, isCompleted, id }: any) =>
                        !isCompleted ?
                            <div key={id} id={id} className="table1">
                                <h5>{student}</h5>
                                <h5>{task}</h5>

                                <button onClick={deleteButton}>Delete</button>
                                <button className="btn-grad1">{isCompleted ? "Completed" : "inCompleted"}</button>
                                <div className={isCompleted ? "checkbox-JASofton1" : "checkbox-JASoftoff1"}>
                                    <div onClick={changueComplete} id="checkAvanzado1"></div>
                                    <label htmlFor="checkAvanzado"></label>
                                </div>


                            </div>
                            :
                            null
                    )
                }
            </div>

        </>
    )
}