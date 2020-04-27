import {Dispatcher} from 'flux'
import React from "react"

class FishermanDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        })
    }

}

const dispatcher = new FishermanDispatcher();

export default dispatcher
