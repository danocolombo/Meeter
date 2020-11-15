import axios from 'axios';

export default {
    getData: () => axios('/api/meeting/attendance/wbc/5'),
};
