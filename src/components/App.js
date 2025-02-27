import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import PageNotFound from './PageNotFound'
import Login from './Login'
import Nav from './Nav'
import users from '../reducers/users'
import questions from '../reducers/questions'
import PrivateRoute from './PrivateRoute'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Switch>
                                    <PrivateRoute path='/' exact component={Dashboard}/>
                                    <PrivateRoute path='/question/:id' exact component={Question}/>
                                    <PrivateRoute path='/add' exact component={NewQuestion}/>
                                    <PrivateRoute path='/leaderboard' exact component={LeaderBoard}/>
                                    <Route path='/login' exact component={Login}/>
                                    <Route path='/pageNotFound' exact component={PageNotFound}/>
                                    <PrivateRoute path='/*' component={PageNotFound}/>
                                </Switch>
                            </div>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        loading: users === {} && questions === {},
        authedUser
    }
}

export default connect(mapStateToProps)(App)
