import { useState } from "react";
export default function Player({name,symbol,isActive,onChangeName})
{
  const  [newPlayerName,setNewPlayerName]=useState(name);
  const [isEditing,setIsEditing] = useState(false);
  function handleClick()
  {
    setIsEditing(isEditing => !isEditing);
    if(isEditing)
    {
    onChangeName(symbol,newPlayerName)
    }
  }
  let playerName = <span className="player-name">{newPlayerName}</span>;
  let buttonName= "Edit";
  function handleChange(event)
  {
    setNewPlayerName(event.target.value);
  }
  if(isEditing)
  {
    playerName = <input type="text" required value={newPlayerName} onChange={handleChange}/>;
    buttonName ="Save";
    
  }
    return (
        <li className={isActive?"active":""}>
          <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClick}>{buttonName}</button>
        </li>
    );
}