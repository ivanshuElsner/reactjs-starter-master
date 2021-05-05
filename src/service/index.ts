import axios from 'axios';

export default class Service {
    static weatherstackAPIKey = 'e9edfc2637471996904d1bdb5f78b67d';
    static postMethod = 'POST';
    static getMethod = 'GET';
    static putMethod = 'PUT';
    static deleteMethod = 'DELETE';
    static headers = {
        accept: 'application/json',
        'content-type': 'application/json'
    };
    static error_message = 'Something went wrong!';
    static countryListAPI = 'https://restcountries.eu/rest/v2/name';
    static weatherstackAPI = 'http://api.weatherstack.com/current';

    static async makeAPICall(methodName: string, api_url: string, params: string = '') {
        if (methodName === this.getMethod) {
            if (params) {
                api_url = api_url + '?' + params;
            }
            try {
                const response = await axios.get(api_url);
                return response;
            } catch (error) {
                console.log(error);
                return error.response;
            }
        }
    }
}