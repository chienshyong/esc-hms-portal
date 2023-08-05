import ListCloseView from './listcloseview';
import CloseCaseButton from "./closeticketbutton"

export default function TicketSelection({closecasecolumns,closecaserows,selectedIds,handleSelectionModelChange,handleCloseTicket}) {
    return (
        <form onSubmit={handleCloseTicket}>
            <ListCloseView closecasecolumns={closecasecolumns} closecaserows={closecaserows} selectedIds={selectedIds} handleSelectionModelChange={handleSelectionModelChange}></ListCloseView>
            <CloseCaseButton></CloseCaseButton>
        </form>
    )
}