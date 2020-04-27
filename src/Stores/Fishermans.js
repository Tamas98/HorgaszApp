import EventEmitter from 'events';
import dispatcher from '../Dispatchers/AdministrationDispatcher'

class Fishermans extends EventEmitter{

    _fishermans = []

    _notQueriedData = []

    filter_by_specie = "All specie"

    filter_by_date = "Full year"

    _states =[]

    emitChange(){
        this.emit('Change');
    }

    addChangeListener(callback){
        this.on('Change', callback);
    }

    removeChangeListener(callback){
        this.removeListener('Change', callback);
    }
}

const store = new Fishermans()

dispatcher.register((action) => {
    if(action.payload.command === 'QUERY_ALL_FISHERMANS') {
        fetch("http://localhost:3001/fishermans", {method: "GET"})
            .then(response => response.json())
            .then(response => store._fishermans = response)
            .then(() =>{
                console.log("Queried all fisherman")
                store._notQueriedData = JSON.parse(JSON.stringify(store._fishermans))
                let states = new Set()

                store._fishermans.map(fisherman => states = states.add(fisherman.state))

                store._states = [...states]
            })
            .then(() => store.emitChange())

    }else if(action.payload.command === 'QUERY_FISHERMANS_FROM_STATE') {

        let queryUrl = "http://localhost:3001/fishermans"
        if (action.payload.state !== "All state") {
            queryUrl += "?state=" + action.payload.state
        }

        fetch(queryUrl, {method: "GET"})
            .then(response => response.json())
            .then(response => store._fishermans = response)
            .then(() => store._notQueriedData = JSON.parse(JSON.stringify(store._fishermans)))
            .then(() => {
                if(store.filter_by_specie !== "All specie"){
                    store._fishermans.map((fisherman,index) => {
                        fisherman.catches = fisherman.catches.filter((currentCatch) => currentCatch.specie === store.filter_by_specie)
                    })
                }if(store.filter_by_date !== "Full year"){
                    store._fishermans.map((fisherman,index) => {
                        fisherman.catches = fisherman.catches.filter((currentCatch) => currentCatch.date.toString().includes(store.filter_by_date.toString()) )
                    })
                }
            })
            .then(() => store.emitChange())

    }else if(action.payload.command === 'FILTER_BY_SPECIE') {
        if (action.payload.specie !== "All specie") {
            store.filter_by_specie = action.payload.specie
            store._fishermans = JSON.parse(JSON.stringify(store._notQueriedData))
            store._fishermans.map((fisherman, index) => {
                fisherman.catches = fisherman.catches.filter((currentCatch) => currentCatch.specie === action.payload.specie)
            })
        } else {
            store._fishermans = JSON.parse(JSON.stringify(store._notQueriedData))
        }

        if(store.filter_by_date !== "Full year"){
            store._fishermans.map((fisherman, index) => {
                fisherman.catches = fisherman.catches.filter((currentCatch) => {
                    return currentCatch.date.toString().includes(store.filter_by_date.toString())
                })
            })
        }

        store.emitChange()
    }
    else if(action.payload.command === 'FILTER_BY_DATE') {
        if (action.payload.date !== "Full year") {
            store.filter_by_date = action.payload.date
            store._fishermans = JSON.parse(JSON.stringify(store._notQueriedData))
            store._fishermans.map((fisherman, index) => {
                fisherman.catches = fisherman.catches.filter((currentCatch) => {
                    return currentCatch.date.toString().includes(action.payload.date.toString())
                })
            })

        } else {
            store._fishermans = JSON.parse(JSON.stringify(store._notQueriedData))
        }

        if(store.filter_by_specie !== "All specie"){
            store._fishermans.map((fisherman, index) => {
                fisherman.catches = fisherman.catches.filter((currentCatch) => currentCatch.specie === store.filter_by_specie)
            })
        }

        store.emitChange()

    }
})

export default store