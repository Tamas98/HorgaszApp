import {Dispatcher} from 'flux'
import React from "react"

class AdministrationDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        })
    }

}

const dispatcher = new AdministrationDispatcher();

export default dispatcher
