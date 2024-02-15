import {useState} from "react";

export default function ToDoList() {
    const [list, setList] = useState([]);
    const [text, setText] = useState('')

    function changeState(item_id) {
        setList(list.map(item => item.id === item_id ? {...item, status: !item.status} : item))
    }

    function addItem() {
        setList(list => [...list, {
            id: list.length,
            text: text,
            status: false
        }]);
    }

    return (
        <div>
            <ul>
                {list.map(item => <li key={item.id}
                                      onClick={() => changeState(item.id)}>{item.status ? '✔' : '✖'} {item.text}</li>)}
            </ul>
            <div>
                <input type="text" placeholder='Что нужно сделать?' value={text}
                       onInput={e => setText(e.target.value)}/>
                <button onClick={addItem}>Добавить в список</button>
            </div>
        </div>
    )
}