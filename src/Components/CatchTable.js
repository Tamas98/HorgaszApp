import React from 'react'
import PersonalActions from "../Actions/PersonalActions";

function addNewCatch(event){
    event.preventDefault()
    let specieSelect = document.getElementById("speciePicker")
    let specie = specieSelect.options[specieSelect.selectedIndex].value
    let date = document.getElementById("datePicker").valueAsDate
    let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    let weight = document.getElementById("weight").value
    let coordinates = document.getElementById("coordinates").value
    let lake = document.getElementById("lake").value

    let newCatch = {
        specie: specie,
        date:formattedDate,
        weight:weight,
        coordinate:coordinates,
        lake: lake
    }

    PersonalActions.addCatch(newCatch)
}

let catchTable = ({catches}) => {
    return(
        <div>
            <h5 className="text-danger font-weight-bold m-2">Catches</h5>
            <table className="table-bordered bg-dark w-100">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Specie</th>
                        <th>Weight</th>
                        <th>Lake</th>
                        <th>Coordinates</th>
                    </tr>
                    {
                        catches.map((concreteCatch,index) => {
                            return(
                                <tr key={index}>
                                    <td>{concreteCatch.date}</td>
                                    <td>{concreteCatch.specie}</td>
                                    <td>{parseFloat(concreteCatch.weight).toPrecision(4)} kg</td>
                                    <td>{concreteCatch.lake}</td>
                                    <td>{concreteCatch.coordinate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <h5>Add new catch:</h5>
            <form onSubmit={addNewCatch}>
                <label className="ml-2 mr-1 text-dark font-weight-bold">Specie:</label>
                <select id="speciePicker">
                    {["Carp","Catfish","Salmon","Hekk","Shark","Aligator","Turtle"].map(specie => <option>{specie}</option>)}
                </select>
                <label className="ml-2 mr-1 text-dark font-weight-bold">Date:</label>
                <input id="datePicker" type="date"/>
                <label className="ml-2 mr-1 text-dark font-weight-bold">Weight:</label>
                <input id="weight" type="number" min="0"/>
                <label className="ml-2 mr-1 text-dark font-weight-bold">Coordinates:</label>
                <input id="coordinates" type="text" placeholder="(x,y)"/>
                <label className="ml-2 mr-1 text-dark font-weight-bold">Lake:</label>
                <input id="lake" type="text" placeholder="Lake"/>
                <input type="submit" value="Submit" className="btn-success ml-2"/>
            </form>
        </div>
    )
}

export default catchTable