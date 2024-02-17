"use client"
import { Suspense, useState } from "react";

function Demo() {
    const [data, setData] = useState([
        { id: 0},
        { id: 1}
    ]);
    const [itemNo, setItemNo] = useState(2);

    const onAddRow = () => {
        const updatedData = [...data];
        setItemNo(itemNo+1);
        const id = itemNo;
        updatedData.push({ id });
        setData(updatedData);
        requestAnimationFrame(() => {
        // QUEUE REQUEST FOR NEXT FRAME
        // this block of code will execute when brower is ready to repaint screen
        const ele = document.getElementById(`focus${id}`);
        ele?.focus();
        });
    };

    const onDeleteRow = (id: number) => {
        setData(data.filter((x) => x.id !== id));
    };

    return (
        <div className="float-right w-1/2">
        <button onClick={() => onAddRow()}>Add</button>
        <table>
            <tbody>
            {data?.map((x, index) => (
            <tr key={x.id}>
                <td>{index + 1}</td>
                <td>
                <input className="text-black" id={`focus${x.id}`} />
                </td>
                <td>
                <button onClick={() => onDeleteRow(x.id)}>Delete</button>
                </td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>  
    );
}
export default function toDo() {
    

    return (
        <main>
            <div>
                To DO
            </div>
            <textarea className="text-black w-1/2 h-2/1"></textarea>
            <Suspense>{Demo()}</Suspense>
        </main>
    )
}