import React from 'react';
import { Input } from 'reactstrap';
const Shelves = (props) => {
    const { currentItemID, currentShelf, handleShelfChange } = props
    const shelves = ["to-read", "reading", "done"]
    return (
        // current shelf + onclickhandler , list of shelves
        < Input onChange={(e) => { handleShelfChange(e.target.value, currentItemID) }} type="select" name="select" id="exampleSelect" >
            {shelves.map((shelf) => {
                // isSelected{ shelf === props.currentShelf ? selected}
                if (shelf === currentShelf) {
                    return (<option selected>{shelf} </option>)
                }
                return (<option >{shelf} </option>)

            })}
        </Input >

    );
}

export default Shelves;
