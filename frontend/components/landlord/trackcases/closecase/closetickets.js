"use client"
import React, {useState} from 'react';
import ListView from "./listallview"
import CloseCaseButton from "./closecasebutton"

export default function TicketSelection() {
    const [selectedIds, setSelectedIds] = useState([]);

    const handleSelectionModelChange = (selectionModel) => {
      setSelectedIds(selectionModel);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submitting service form...')
        console.log("Cases Selected: ", selectedIds)
      };

    return (
        <form onSubmit={handleSubmit}>
            <ListView selectedIds={selectedIds} handleSelectionModelChange={handleSelectionModelChange}></ListView>
            <CloseCaseButton></CloseCaseButton>
        </form>
    )
}