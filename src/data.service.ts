import axios from 'axios';

export default {
    getData(screen: string) {
        return axios.get('./data/' + screen + '.json');
    }
}