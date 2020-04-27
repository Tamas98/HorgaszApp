import React from "react";

let fishermanCard = ({name,id,state,address,catchSpecies,weight}) =>{
    return(
        <div id="personalPage" style={{display:"none"}} className="container border bg-white border-dark m-2 p-2 w-25">
            <div className="row">
                <div className="col-md-10 d-flex justify-content-md-start">
                    <h3>{name}</h3>
                </div>
                <div className="col-md-2 d-flex justify-content-md-end">
                    <p>ID: {id}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p>State: {state}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p>Address: {address}</p>
                </div>
            </div>
            <div>
                <p>Biggest Catch: {catchSpecies} ({parseFloat(weight).toPrecision(4)} kg) </p>
            </div>
        </div>
    )
}

export default fishermanCard