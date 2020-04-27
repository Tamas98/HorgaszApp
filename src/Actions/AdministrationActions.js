import dispatcher from "../Dispatchers/AdministrationDispatcher";

class AdministrationActions {

    queryAllFishermans(){
        dispatcher.handleViewAction({
            command : 'QUERY_ALL_FISHERMANS',
        });
    }

    queryFishermansFromState(state){
        dispatcher.handleViewAction({
            command : 'QUERY_FISHERMANS_FROM_STATE',
            state: state
        });
    }

    filterCatchesBySpecie(specie){
        dispatcher.handleViewAction({
            command : 'FILTER_BY_SPECIE',
            specie: specie
        });
    }

    filterCatchesByDate(date){
        dispatcher.handleViewAction({
            command : 'FILTER_BY_DATE',
            date: date
        });
    }
}
export default new AdministrationActions()