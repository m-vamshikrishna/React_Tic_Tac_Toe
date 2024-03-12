export default function Log({turns,players})
{
    return <ol id="log">
    {turns.map((turn)=>(
        <li key={`${turn.square.row}${turn.square.col}`}>{players[turn.player]} Selected {turn.square.row} {turn.square.col}</li>
    ))}
    </ol>
}