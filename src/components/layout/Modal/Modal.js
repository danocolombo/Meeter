import React, { Fragment } from 'react';

const modal = (props) => (
    <Fragment>
        <div
            className={'Modal'}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
            }}
        >
            {props.children}
        </div>
    </Fragment>
);
export default modal;
