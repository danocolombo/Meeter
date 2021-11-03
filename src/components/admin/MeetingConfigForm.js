import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, FormControlLabel, Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Spinner from '../layout/Spinner';
import {
    toggleConfig,
    getMtgConfigs,
    updateMeetingConfigs,
} from '../../actions/admin';
import { SET_DEFAULT_GROUPS } from '../../actions/types';

const initialState = {
    setupContact: true,
    transportationContact: true,
    transportationCnt: true,
    avContact: true,
    greeterContact1: true,
    greeterContact2: true,
    resourceContact: true,
    announcementsContact: true,
    closingContact: true,
    mealCnt: true,
    meal: true,
    mealCoordinator: true,
    cafeCnt: true,
    cafeCoordinator: true,
    nursery: true,
    nurseryContact: true,
    children: true,
    childrenContact: true,
    youth: true,
    youthContact: true,
    donations: true,
    securityContact: true,
    cleanupContact: true,
};
const MeetingConfig = ({
    toggleConfig,
    getMtgConfigs,
    updateMeetingConfigs,
    auth: { activeClient },
    meeter: { mtgConfigs, loading },
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        getMtgConfigs();
        //now update formData from redux
        setFormData({
            ...formData,
            setupContact: mtgConfigs.setupContact ? true : false,
            transportationContact: mtgConfigs.transportationContact ? true : false,
            transportationCnt: mtgConfigs.transportationCnt ? true : false,
            avContact: mtgConfigs.avContact ? true : false,
            greeterContact1: mtgConfigs.greeterContact1 ? true : false,
            greeterContact2: mtgConfigs.greeterContact2 ? true : false,
            resourceContact: mtgConfigs.resourceContact ? true : false,
            announcementsContact: mtgConfigs.announcementsContact ? true : false,
            closingContact: mtgConfigs.closingContact ? true : false,
            mealCnt: mtgConfigs.mealCnt ? true : false,
            meal: mtgConfigs.meal ? true : false,
            mealCoordinator: mtgConfigs.mealCoordinator ? true : false,
            cafeCnt: mtgConfigs.cafeCnt ? true : false,
            cafeCoordinator: mtgConfigs.cafeCoordinator ? true : false,
            nursery: mtgConfigs.nursery ? true : false,
            nurseryContact: mtgConfigs.nurseryContact ? true : false,
            children: mtgConfigs.children ? true : false,
            childrenContact: mtgConfigs.childrenContact ? true : false,
            youth: mtgConfigs.youth ? true : false,
            youthContact: mtgConfigs.youthContact ? true : false,
            donations: mtgConfigs.donations ? true : false,
            securityContact: mtgConfigs.securityContact ? true : false,
            cleanupContact: mtgConfigs.cleanupContact ? true : false,
        });
    }, [loading, getMtgConfigs, mtgConfigs]);
    // const [formData, setFormData] = useState(initialState);
    // const { donations, cafe, cafeFac } = formData;

    //create intial formData
    const {
        setupContact,
        transportationContact,
        transportationCnt,
        avContact,
        greeterContact1,
        greeterContact2,
        resourceContact,
        announcementsContact,
        closingContact,
        mealCnt,
        meal,
        mealCoordinator,
        cafeCnt,
        cafeCoordinator,
        nursery,
        nurseryContact,
        children,
        childrenContact,
        youth,
        youthContact,
        donations,
        securityContact,
        cleanupContact,
    } = formData;

    // const onChange = (e) => {
    //     setFormData({ ...FormData, [e.target.name]: e.target.value });
    // };
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.checked });
        toggleConfig(event.target.name, event.target.checked, activeClient);
        alert('changing ' + event.target.name + ':' + event.target.checked);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const theConfigs = updateMeetingConfigs(
            formData,
            history,
            activeClient,
            true
        );
        console.log('backfrom updateMeetingConfigs call');
        console.table(theConfigs);
        window.scrollTo(0, 0);
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='post-form'>
                {/* <div className='bg-primary p'>
                <h3>Meeting Configurations</h3>
            </div> */}
                <form>
                    <div className='MeetingConfigFormBox'>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={donations}
                                        onChange={handleChange}
                                        name='donations'
                                        color='primary'
                                    />
                                }
                                label='Donations'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={setupContact}
                                        onChange={handleChange}
                                        name='setupContact'
                                        color='primary'
                                    />
                                }
                                label='Setup Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={cleanupContact}
                                        onChange={handleChange}
                                        name='cleanupContact'
                                        color='primary'
                                    />
                                }
                                label='Clean-up Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={transportationContact}
                                        onChange={handleChange}
                                        name='transportationContact'
                                        color='primary'
                                    />
                                }
                                label='Transportation Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={transportationCnt}
                                        onChange={handleChange}
                                        name='transportationCnt'
                                        color='primary'
                                    />
                                }
                                label='Transportation Count/Usage'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={avContact}
                                        onChange={handleChange}
                                        name='avContact'
                                        color='primary'
                                    />
                                }
                                label='Audio/Visual Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={greeterContact1}
                                        onChange={handleChange}
                                        name='greeterContact1'
                                        color='primary'
                                    />
                                }
                                label='Greeter 1 Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={greeterContact2}
                                        onChange={handleChange}
                                        name='greeterContact2'
                                        color='primary'
                                    />
                                }
                                label='Greeter 2 Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={resourceContact}
                                        onChange={handleChange}
                                        name='resourceContact'
                                        color='primary'
                                    />
                                }
                                label='Resources Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={announcementsContact}
                                        onChange={handleChange}
                                        name='announcementsContact'
                                        color='primary'
                                    />
                                }
                                label='Announcements Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={closingContact}
                                        onChange={handleChange}
                                        name='closingContact'
                                        color='primary'
                                    />
                                }
                                label='Closing Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={securityContact}
                                        onChange={handleChange}
                                        name='securityContact'
                                        color='primary'
                                    />
                                }
                                label='Security Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={mealCnt}
                                        onChange={handleChange}
                                        name='mealCnt'
                                        color='primary'
                                    />
                                }
                                label='Meal Count'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={meal}
                                        onChange={handleChange}
                                        name='meal'
                                        color='primary'
                                    />
                                }
                                label='Meal Description'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={mealCoordinator}
                                        onChange={handleChange}
                                        name='mealCoordinator'
                                        color='primary'
                                    />
                                }
                                label='Meal Contact/Coordinator'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={cafeCnt}
                                        onChange={handleChange}
                                        name='cafeCnt'
                                        color='primary'
                                    />
                                }
                                label='Cafe Numbers'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={cafeCoordinator}
                                        onChange={handleChange}
                                        name='cafeCoordinator'
                                        color='primary'
                                    />
                                }
                                label='Cafe Coordinator'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={nursery}
                                        onChange={handleChange}
                                        name='nursery'
                                        color='primary'
                                    />
                                }
                                label='Nursery Numbers'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={nurseryContact}
                                        onChange={handleChange}
                                        name='nurseryContact'
                                        color='primary'
                                    />
                                }
                                label='Nursery Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={children}
                                        onChange={handleChange}
                                        name='children'
                                        color='primary'
                                    />
                                }
                                label='Children Numbers'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={childrenContact}
                                        onChange={handleChange}
                                        name='childrenContact'
                                        color='primary'
                                    />
                                }
                                label='Children Contact'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={youth}
                                        onChange={handleChange}
                                        name='youth'
                                        color='primary'
                                    />
                                }
                                label='Youth Numbers'
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={youthContact}
                                        onChange={handleChange}
                                        name='youthContact'
                                        color='primary'
                                    />
                                }
                                label='Youth Contact'
                            />
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={onSubmit}
                            >
                                Save Configurations
                            </Button>
                        </FormGroup>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

MeetingConfig.propTypes = {
    toggleConfig: PropTypes.func.isRequired,
    getMtgConfigs: PropTypes.func.isRequired,
    updateMeetingConfigs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});

export default connect(mapStateToProps, {
    toggleConfig,
    getMtgConfigs,
    updateMeetingConfigs,
})(MeetingConfig);
