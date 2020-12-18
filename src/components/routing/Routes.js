import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/UserProfile';

import People from '../people/People';
// import Gathering from '../gatherings/Gathering';
import Gatherings from '../gatherings/Gatherings';
// import Groups from '../gatherings/Groups';
import EditGathering from '../gatherings/EditGathering';
import EditGroup from '../gatherings/EditGroup';
import EditPerson from '../people/EditPerson';
//import GatheringForm from '../gatherings/GatheringForm';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import UserProfile from '../profile/UserProfile';
// import PersonForm from '../people/PersonForm';

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/userprofile' component={UserProfile} />
                {/* <PrivateRoute exact path='/profiles' component={Profiles} />
                <PrivateRoute exact path='/profile/:id' component={Profile} /> */}
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                {/* <PrivateRoute
                    exact
                    path='/create-profile'
                    component={CreateProfile}
                /> */}
                {/* <PrivateRoute
                    exact
                    path='/edit-profile'
                    component={EditProfile}
                /> */}
                <PrivateRoute exact path='/people' component={People} />
                <PrivateRoute exact path='/gatherings' component={Gatherings} />
                <PrivateRoute
                    exact
                    path='/gatherings/:options'
                    component={Gatherings}
                />
                {/* { <PrivateRoute
                    exact
                    path='/gatheringForm'
                    component={GatheringForm}
                /> */}
                {/* <PrivateRoute
                    exact
                    path='/gatheringForm/:id'
                    component={GatheringForm}
                /> */}
                <PrivateRoute
                    exact
                    path='/EditGathering/:id'
                    component={EditGathering}
                />
                {/* <PrivateRoute
                    exact
                    path='/Groups/:mid/:gid'
                    component={Groups}
                /> */}
                <PrivateRoute
                    exact
                    path='/EditGroup/:mid/:gid'
                    component={EditGroup}
                />
                <PrivateRoute
                    exact
                    path='/EditPerson/:id'
                    component={EditPerson}
                />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
