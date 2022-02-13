import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ConfirmUser from '../auth/ConfirmUser';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
// ====================
// for config/admin
//=====================
import MeeterConfig from '../admin/Config';
import MeeterAdmin from '../admin/Admin';
import EditDefaultGroups from '../admin/DefaultGroupForm';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/UserProfile';

import People from '../people/People';
// import Gathering from '../gatherings/Gathering';
import Gatherings from '../gatherings/Gatherings';
import EditGathering from '../gatherings/EditGathering';
import EditGroup from '../gatherings/EditGroup';
import EditPerson from '../people/EditPerson';
//import GatheringForm from '../gatherings/GatheringForm';
// import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import UserProfile from '../profile/UserProfile';
// import Landing from '../layout/Landing';
import ErrorPage from '../layout/Error';
// import PersonForm from '../people/PersonForm';

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route
                    exact
                    path='/confirmuser/:registeredName'
                    component={ConfirmUser}
                />
                <PrivateRoute
                    exact
                    path='/confirmuser'
                    component={ConfirmUser}
                />
                <Route exact path='/userprofile' component={UserProfile} />
                {/* <PrivateRoute exact path='/profiles' component={Profiles} />
                <PrivateRoute exact path='/profile/:id' component={Profile} /> */}
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                {/* <PrivateRoute
                    exact
                    path='/create-profile'
                    component={CreateProfile}
                />
                <PrivateRoute
                    exact
                    path='/edit-profile'
                    component={EditProfile}
                />
                {/* <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} /> }{' '}
                */}
                <PrivateRoute exact path='/people' component={People} />
                <PrivateRoute exact path='/gatherings' component={Gatherings} />
                <PrivateRoute
                    exact
                    path='/gatherings/:options'
                    component={Gatherings}
                />
                {/* <PrivateRoute
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
                <PrivateRoute
                    exact
                    path='/EditGroup/:groupId'
                    component={EditGroup}
                />
                <PrivateRoute
                    exact
                    path='/EditPerson/:id'
                    component={EditPerson}
                />
                <PrivateRoute exact path='/Config' component={MeeterAdmin} />
                <PrivateRoute
                    exact
                    path='/EditDefaultGroups'
                    component={EditDefaultGroups}
                />
                <Route exact path='/404' render={(props) => <ErrorPage />} />
                <Redirect to='/404' />
                {/* <Route path='*' component={ErrorPage}/> */}
                {/* <Route component={NotFound} /> */}
            </Switch>
        </section>
    );
};

export default Routes;
