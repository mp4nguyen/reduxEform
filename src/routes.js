import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/components/App';
import Home from './home/containers/home.container';


export default (
	<Route path="/" component={App}>
			 <Route name="home/*" path="home/*" component={Home}/>
	</Route>

);

//?appointmentUID=:appointmentUID&patientUID=:patientUID&templateUID=:templateUID&userUID=:userUID
//home?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14
////
//<Route name="home" path="home?appointmentUID=:appointmentUID/:patientUID/:templateUID/:userUID" component={Home}/>
