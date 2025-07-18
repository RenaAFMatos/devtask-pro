export default function TaskForm(){
    return (
        <form>
            <div>
                <label htmlFor="taskName">Task Name:</label>
                <input type="text" id="taskName" name="taskName" />
            </div>
        </form>
    )
}