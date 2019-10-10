import React, {Component, Fragment} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {setAuthedUser} from '../actions/authedUser'

class Nav extends Component {
    logout = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(setAuthedUser(null))
        this.props.history.push(`/`)
    }

    render() {
        const {username, authedUser} = this.props
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    {authedUser !== null ?
                        (<Fragment>
                            <li>
                                Hello! {username} &nbsp;
                            </li>
                            <li>
                                <button className='link' onClick={(e) => this.logout(e)}>
                                    Log out
                                </button>
                            </li>
                        </Fragment>)
                        : (
                            <li>You are not logged in.</li>

                        )
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    const user = users[authedUser]
    return {
        username: user ? user.name : null,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Nav))