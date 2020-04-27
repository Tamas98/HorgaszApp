import React from 'react'
import Fishermans from '../Stores/Fishermans'
import AdministrationActions from '../Actions/AdministrationActions'

class MainAdministrationComponent extends React.Component{

    constructor() {
        super();
        this.state={
            fishermans: [],
            states: [],
        }
        this.onChangeOfFishermans = this.onChangeOfFishermans.bind(this);
    }

    onChangeOfFishermans() {
        this.setState({
            fishermans: Fishermans._fishermans,
            states: Fishermans._states
        })
    }

    componentWillUnmount() {
        Fishermans.removeChangeListener(this.onChangeOfFishermans)
    }

    componentDidMount() {
        Fishermans.addChangeListener(this.onChangeOfFishermans);
    }

    render() {
        let allSum = 0;
        let year = new Date().getFullYear()
        return (
            <div id="administration" style={{display:"none"}} className="vh-100 bg-info">
                <div>
                    <div>
                        <h4>Filter by:</h4>
                    </div>
                    <form>
                        <label>State: </label>
                        <select className="text-white bg-dark m-2 p-1" onChange={(event) => AdministrationActions.queryFishermansFromState(event.target.value)}>
                            <option className="text-white" key={this.state.states.size+2}>All state</option>
                            {this.state.states.sort().map((state,index) => {
                                return <option className="text-white" key={index}>{state}</option>
                            })}
                        </select>
                        <label>Specie: </label>
                        <select className="text-white bg-dark m-2 p-1" onChange={(event) => AdministrationActions.filterCatchesBySpecie(event.target.value)}>
                            <option className="text-white">All specie</option>
                            {["Carp","Catfish","Salmon","Hekk","Shark","Aligator","Turtle"].sort().map((specie,index) => {
                                return <option className="text-white" key={index}>{specie}</option>
                            })}
                        </select>
                        <label className="text-danger">Month: </label>
                        <select className="text-white bg-dark m-2 p-1" onChange={(event) => AdministrationActions.filterCatchesByDate(event.target.value)}>
                            <option className="text-white">Full year</option>
                            {
                                [...Array(12).keys()].map(monthnum =>{
                                    return <option>{monthnum+1}-{year}</option>
                                })
                            }
                        </select>
                    </form>
                </div>
                <table className="table-bordered bg-dark w-100">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Catches Weight</th>
                        </tr>
                        {
                            this.state.fishermans.map((fisherman,index) =>
                                <tr key={index}>
                                    <td>{fisherman.id}</td>
                                    <td>{fisherman.name}</td>
                                    <td>{fisherman.address}</td>
                                    <td>{parseFloat(fisherman.catches.reduce((result,currentCatch) => {
                                        allSum += currentCatch.weight
                                        return result += currentCatch.weight
                                    },0)).toPrecision(5)} kg</td>
                                </tr>
                            )
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{parseFloat(allSum).toPrecision(10)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MainAdministrationComponent;