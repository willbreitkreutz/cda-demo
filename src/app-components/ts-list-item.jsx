

function TsListItem({time, val}){
    const formattedTime = new Date(time)
    return (
        <li><strong>{formattedTime.toUTCString()}</strong>-{val}</li>
    )
}

export default TsListItem;