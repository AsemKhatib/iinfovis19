import axios from 'axios';

export default {
    getData(fileName: string) {
        return axios.get('./data/' + fileName + '.json');
    },
    getCSV() {
        return axios.get('./csv/DataCollection_Xenia - Music.csv');
    }
}