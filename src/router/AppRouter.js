import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';

import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const { verificaToken, auth } = useContext(AuthContext);

    console.log(auth)

    useEffect(() => {
        verificaToken()
    }, [verificaToken])


    if (auth.checking) {
        return <h1>Esperese</h1>
    }


    return (
        <Router>
            <div>

                <Switch>

                    <PublicRoute
                        isAuthenticated={auth.logged}
                        component={AuthRouter}
                        path="/auth"
                    />
                    <PrivateRoute isAuthenticated={auth.logged} exact path="/" component={ChatPage} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
