import React from 'react'
import AdministrationAction from '../Actions/AdministrationActions'

let MainPage = () => {
    return(
        <div className="container-fluid bg-info">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center m-2">
                    <h1 className="font-weight-bold">Fisherman’s Log</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center m-2">
                    <button className="btn-dark m-2 pb-1 pt-1 pl-3 pr-3 font-weight-bold" onClick={() => {
                        document.getElementById("administration").style.display = "none"
                        document.getElementById("personalData").style.display = "block"
                    }}>Fisherman</button>
                    <button className="btn-danger m-2 pb-1 pt-1 pl-3 pr-3 font-weight-bold" onClick={() => {
                        document.getElementById("administration").style.display = "block"
                        document.getElementById("personalData").style.display = "none"
                        AdministrationAction.queryAllFishermans()
                    }}>Administrator</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage