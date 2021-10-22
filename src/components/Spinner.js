import React, { Fragment } from 'react'
import spinner from '../assets/images/spinner.gif'

const Spinner = () =>
    <Fragment>
        <img
            src={spinner}
            alt="Loading..."
            className="spinner"
        />
    </Fragment>

export default Spinner
