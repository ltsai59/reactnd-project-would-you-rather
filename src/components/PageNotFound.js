import React, {Fragment} from 'react'
import {NavLink} from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='error-page'>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Fragment>
                <h3>We're sorry, the page you requested could not be found.</h3>
                <h4>
                    Please go back to the <NavLink to='/' exact activeClassName='active'>[ Home page ]</NavLink>.
                </h4>
            </Fragment>
        </div>
    )
}