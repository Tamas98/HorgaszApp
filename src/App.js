import React from 'react';
import './App.css';
import './style.scss'
import MainAdministration from "./Components/MainAdministration";
import FishermanPersonalPage from "./Components/FishermanPersonalPage";
import MainPage from "./Components/MainPage";

class App extends React.Component{

    render() {
        return (
            <div id="mainContainer" className="container-fluid bg-info m-0 m-2">
                <div className="row">
                    <div className="col-md-12">
                        <MainPage/>
                        <FishermanPersonalPage/>
                        <MainAdministration/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
