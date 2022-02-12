import React from 'react'

function Alerts(props) {
    const funcCapitalize = (msg) => {
        return msg.charAt([0]).toUpperCase() + msg.slice(1);
    }
    return (
        <div style={{ height: '55px' }}>
            {
                props.alert && <div className={`alert alert-${props.alert.alerts}`} role="alert">
                    <strong>{funcCapitalize(props.alert.alerts)}</strong> {props.alert.message}
                </div>
            }
        </ div>
    )
}

export default Alerts
