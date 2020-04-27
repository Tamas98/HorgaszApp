import EventEmitter from 'events';
import dispatcher from '../Dispatchers/AdministrationDispatcher'

class FishermanPersonalStore extends EventEmitter{

    _fisherman = {}

    _equipment = []

    _catches = []

    _largestCatch = []

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

const store = new FishermanPersonalStore()

dispatcher.register((action) => {
    if(action.payload.command === 'QUERY_FISHERMAN_BY_ID') {
        fetch("http://localhost:3001/fishermans?id="+action.payload.id, {method: "GET"})
            .then(response => response.json())
            .then(response => {
                if(response.length === 0) {
                    throw new Error(action.payload.id)
                }
                return response
            })
            .then(response => {
                document.getElementById("personalPage").style.display = "block"
                store._fisherman = response[0]
                store._catches = response[0].catches
                store._equipment = response[0].equipment
            })
            .then(() => {
                let catchSet = new Set();
                store._catches.map(concreteCatch => catchSet.add(concreteCatch.weight))
                catchSet = [...catchSet].sort().reverse()
                store._largestCatch = store._catches.filter((currentCatch) => currentCatch.weight === catchSet[0])
            })
            .then(() => store.emitChange())
            .catch(e => {
                window.alert("No fisherman found with id: " + e.message + "\nTRY AGAIN!")
            })
    }else if(action.payload.command === 'DELETE_BOILE_BY_ID'){
        let allBoiles = store._equipment.boiles
        let boilesWithoutDeletedElement = allBoiles.filter(boiles => boiles.id !== action.payload.id)
        store._fisherman.equipment.boiles = boilesWithoutDeletedElement
        let url = "http://localhost:3001/fishermans/"+store._fisherman.id
        fetch(url,{method:"PATCH",body:JSON.stringify(store._fisherman)
        }).then(() => store.emitChange())
    } else if(action.payload.command === 'DELETE_ROD_BY_ID'){
        let allRod = store._equipment.rods
        let rodsWithoutDeletedElement = allRod.filter(rod => rod.id !== action.payload.id)
        store._fisherman.equipment.rods = rodsWithoutDeletedElement
        fetch("http://localhost:3001/fishermans/"+store._fisherman.id,{method:"PATCH",body: JSON.stringify(store._fisherman)
            ,headers:{'Content-Type': "application/json"}})
            .then(response => console.log(response.json()))
            .then(() => store.emitChange())
    }else if(action.payload.command === 'ADD_NEW_CATCH'){
        let newCatch = action.payload.newCatch
        store._fisherman.catches.push(newCatch)
        fetch("http://localhost:3001/fishermans/"+store._fisherman.id, {method:"PATCH",body: JSON.stringify(store._fisherman)
            ,headers:{'Content-Type': "application/json"}})
            .then(response => console.log(response.json()))
            .then(() =>store.emitChange())
    }
})

export default store