import React from 'react'
import PersonalActions from "../Actions/PersonalActions";

let EquipmentTable = ({equipment}) =>{
    return (
        <div>
            <h5 className="text-danger font-weight-bold m-2">Rods:</h5>
            <table className="table-bordered bg-dark w-100">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Material</th>
                    <th>Price</th>
                </tr>
                {equipment.rods.map((rod,index) => {
                        return (
                            <tr key={index}>
                                <td>{rod.name}</td>
                                <td>{rod.material}</td>
                                <td>{rod.price} $</td>
                                <td><button className="btn-danger" onClick={() => PersonalActions.deleteRod(rod.id)}>X</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <h5 className="text-danger font-weight-bold m-2">Boiles</h5>
            <table className="table-bordered bg-dark w-100">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Material</th>
                    <th>Price</th>
                </tr>
                {equipment.boiles.map((boile,index) => {
                    return (
                        <tr key={index}>
                            <td>{boile.name}</td>
                            <td>{boile.material}</td>
                            <td>{boile.price} $</td>
                            <td><button className="btn-danger" onClick={() => PersonalActions.deleteBoile(boile.id)}>X</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}/*

*/

export default EquipmentTable