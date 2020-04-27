import dispatcher from "../Dispatchers/AdministrationDispatcher";

class PersonalActions {

    queryFishermanById(id){
        dispatcher.handleViewAction({
            command : 'QUERY_FISHERMAN_BY_ID',
            id: id
        });
    }

    deleteRod(id) {
        dispatcher.handleViewAction({
            command: 'DELETE_ROD_BY_ID',
            id: id
        });
    }

    deleteBoile(id){
        dispatcher.handleViewAction({
            command : 'DELETE_BOILE_BY_ID',
            id: id
        });
    }

    addCatch(newCatch){
        dispatcher.handleViewAction({
            command : 'ADD_NEW_CATCH',
            newCatch:newCatch
        });
    }
}
export default new PersonalActions()