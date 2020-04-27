import React from 'react'
import Fisherman from '../Stores/FishermanPersonalStore'
import PersonalActions from "../Actions/PersonalActions";
import FishermanCard from './FishermanCard'
import EquipmentTable from "./EquipmentTable";
import CatchTable from "./CatchTable";

export default class FishermanPersonalPage extends React.Component{

    constructor() {
        super();
        this.state={
            fisherman: {},
            equipment: [],
            catches: [],
            largestFish: {}
        }
        this.onChangeOfFishermanPersonalStore = this.onChangeOfFishermanPersonalStore.bind(this);
    }

    onChangeOfFishermanPersonalStore() {
        this.setState({
            fisherman: Fisherman._fisherman,
            equipment: Fisherman._equipment,
            catches: Fisherman._catches,
            largestFish: Fisherman._largestCatch[0]
        })

        console.log(this.state)
    }

    componentWillUnmount() {
        Fisherman.removeChangeListener(this.onChangeOfFishermanPersonalStore)
    }

    componentDidMount() {
        Fisherman.addChangeListener(this.onChangeOfFishermanPersonalStore);
    }
    render(){
        let tables = this.state.equipment.rods === undefined ? <></> :
            <div>
            <div>
                <EquipmentTable equipment={this.state.equipment}/>
            </div>
            <div>
                <CatchTable catches={this.state.catches}/>
            </div>
        </div>

        return(
            <div style={{display:"none"}} id="personalData" className="container-fluid">
                <div className="d-flex justify-content-center">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        let id = document.getElementById("id")
                        PersonalActions.queryFishermanById(id.value)
                        id.value = ""
                    }}>
                        <input className="m-2" type="number" placeholder="Fisher ID" name="id" id="id"/>
                        <input className="btn-dark" type="submit" value="Submit"/>
                    </form>
                </div>
                <div className="d-flex justify-content-center">
                    <FishermanCard name={this.state.fisherman.name} id={this.state.fisherman.id}
                                   address={this.state.fisherman.address} state={this.state.fisherman.state}
                                catchSpecies={this.state.largestFish.specie} weight={this.state.largestFish.weight}/>
                </div>
                {tables}
            </div>
        );
    }
}   /*

*/