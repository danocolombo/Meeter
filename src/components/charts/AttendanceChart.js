import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import api from '../../actions/chart';
import LineChart from './LineChart';
import Label from './AxisLabel';
import ChartTitle from './ChartTitle';
import { getAttendanceNumbers } from '../../actions/gathering';

const styles = {
    chartComponentsContainer: {
        display: 'grid',
        gridTemplateColumns: 'max-content 700px',
        alignItems: 'center',
    },
    chartWrapper: { maxWidth: 700, alignSelf: 'flex-start' },
};
const data = [
    { label: '8/3', x: 0, y: 6 },
    { label: '8/10', x: 1, y: 25 },
    { label: '8/17', x: 2, y: 22 },
    { label: '8/24', x: 3, y: 20 },
    { label: '8/31', x: 4, y: 16 },
    { label: '9/7', x: 5, y: 20 },
    { label: '9/14', x: 6, y: 18 },
];
let newData = [];

const Attendance = () => {
    let [attendanceData, setAttendanceData] = React.useState('');
    const fetchData = () => {
        // e.preventDefault();
        api.getData()
            .then((response) => {
                setAttendanceData(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Fragment>
            <div style={styles.chartComponentsContainer}>
                <div />

                <ChartTitle text='Wynnbrook CR Attendance' />
                <Label text='Participants' rotate />
                <div style={styles.chartWrapper}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        horizontalGuides={5}
                        precision={0}
                        verticalGuides={1}
                    />
                </div>
                <div />
                {/* <Label text='Days of the Week' /> */}
            </div>
            <div>{attendanceData}</div>

            {console.log('attendanceData.size: ' + attendanceData.size)}
            {/* <div>{fetchData()}</div> */}
        </Fragment>
    );
};
export default Attendance;
