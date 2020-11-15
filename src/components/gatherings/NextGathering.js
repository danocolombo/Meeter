import React from 'react';
//-----------------------------------------------------
//this displays the next gathering coming up. which is
// gathering.gatherings[0] which is already loaded in
// store
//-----------------------------------------------------
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint react/prop-types: 0 */
const NextGathering = ({ gatherings }) => {
    return [
        <>
            {showFuture(gatherings)}
            <br />
            <br />
            {/* {allFutureGatherings(gatherings)} */}
            {/* <table>
                {gatherings.map((g) => (
                    <tr>
                        <td className='gatheringDate'>
                            {showDate(g.meetingDate)}
                        </td>
                        <td>&nbsp;</td>
                        <td>{g.meetingType}</td>
                    </tr>
                ))}
            </table> */}
        </>,
    ];
};
// function allFutureGatherings(gatherings) {
//     const theList = gatherings.map((g) => (
//         <li>
//             {g.meetingDate} - {g.meetingType}
//         </li>
//     ));
//     return <ul>{theList}</ul>;
// }
function showFuture(meetings) {
    console.log('SIZE:' + meetings.length);
    let mDate = null;
    let mTitle = '';
    let mPeep = '';
    
    let theNext = (
        <ul>
            <li>There are no meetings planned in the system.</li>
        </ul>
    );

    if (meetings.length > 0) {
        //=======================================
        // there are future gatherings in store
        //=======================================
        console.log('meeting[0].meetingDate:' + meetings[0].meetingDate);
        console.log('we are in NextGatherings :: showFuture(meetings)');
        let mCnt = meetings.length;
        for (let index = 0; index < mCnt; index++) {
            // const element = array[index];
            console.log(
                index +
                    ' - ' +
                    returnSmallDate(meetings[index].meetingDate) +
                    meetings[index].meetingType
            );
            if (meetings[index].meetingType === 'Lesson') {
                mDate = returnSmallDate(meetings[index].meetingDate);
                mTitle = 'Lesson:' + meetings[index].title;
                mPeep = meetings[index].supportRole;
                mCnt = index;
                theNext = (
                    <div>
                        <table>
                            <tr>
                                <td className='.p-3'>{mDate}</td>
                                <td>&nbsp;&nbsp;</td>
                                <td>{mTitle}</td>
                                <td>{mPeep}</td>
                            </tr>
                        </table>
                    </div>
                );
            }
            if (meetings[index].meetingType === 'Testimony') {
                mDate = returnSmallDate(meetings[index].meetingDate);
                mTitle = meetings[index].meetingType;
                mPeep = meetings[index].title;
                mCnt = index;
                theNext = (
                    <div>
                        <table>
                            <tr>
                                <td className='.p-3'>{mDate}</td>
                                <td>&nbsp;&nbsp;</td>
                                <td>{mTitle}</td>
                                <td>{mPeep}</td>
                            </tr>
                        </table>
                    </div>
                );
            }
            if (meetings[index].meetingType === 'Special') {
                mDate = returnSmallDate(meetings[index].meetingDate);
                mTitle = 'Special:' + meetings[index].title;
                mPeep = meetings[index].supportRole;
                mCnt = index;
                theNext = (
                    <div>
                        <table>
                            <tr>
                                <td className='.p-3'>{mDate}</td>
                                <td>&nbsp;&nbsp;</td>
                                <td>{mTitle}</td>
                                <td>{mPeep}</td>
                            </tr>
                        </table>
                    </div>
                );
            }
            if (meetings[index].meetingType === 'Other') {
                mDate = returnSmallDate(meetings[index].meetingDate);
                mTitle = 'Other:' + meetings[index].title;
                mPeep = meetings[index].supportRole;
                mCnt = index;
                theNext = (
                    <div>
                        <table>
                            <tr>
                                <td className='.p-3'>{mDate}</td>
                                <td>&nbsp;&nbsp;</td>
                                <td>{mTitle}</td>
                                <td>{mPeep}</td>
                            </tr>
                        </table>
                    </div>
                );
            }
            if (meetings[index].meetingType === 'Training') {
                mDate = meetings[index].meetingDate;
                mTitle = 'Training:' + meetings[index].title;
                mPeep = meetings[index].supportRole;
                mCnt = index;
                theNext = (
                    <div>
                        <table>
                            <tr>
                                <td className='.p-3'>{mDate}</td>
                                <td>&nbsp;&nbsp;</td>
                                <td>{mTitle}</td>
                                <td>{mPeep}</td>
                            </tr>
                        </table>
                    </div>
                );
            }
        }
        if (mDate != null) {
            console.log('===============================');
            console.log('our next meeting');
            // console.log(mDate + '  ' + ' - ' + mTitle + '  ' + ' - ' + mPeep);
        }
        // we have the next testimony/lesson defined (if available)
        return [<>{theNext}</>];
    }
    function returnSmallDate(d) {
        // this strips the junk and returns just the month/day/year
        // from this: 2020-06-16T00:00:00.000Z
        // to this: 2020-06-16
        return d.substr(0, 10);
    }
}
// function showDate(d) {
//     //return 'mm/dd/yyyy';
//     let date = new Date(d);
//     let year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let dt = date.getDate() + 1;
//     let nDate = month + '/' + dt + '/' + year;
//     return nDate;
// }

NextGathering.propTypes = {
    gatherings: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
    return { gatherings: state.gathering.gatherings };
};

export default connect(mapStateToProps)(NextGathering);
