import axios from 'axios';

export default {
    getData(fileName: string) {
        return axios.get('./data/' + fileName + '.json');
    },
    getCSV(fileName: string) {
        return axios.get('./csv/DataCollection_'+ fileName +'.csv');
    }
}