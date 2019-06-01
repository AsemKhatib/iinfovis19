import axios from 'axios';

export default {
    getData(screen: string) {
        return axios.get('./data/' + screen + '.json');
    },
    getCSV() {
        return axios.get('./csv/DataCollection_Xenia - Music.csv');
    }
}