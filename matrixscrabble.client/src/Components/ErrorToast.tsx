import React from 'react';
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/esm/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearError, selectErrorMessage } from '../redux/slices/errorSlice';

const ErrorToast = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {

    },);

    return (
        <React.Fragment>
            <Toast show={show} delay={3000} onClose={() => setShow(false)} autohide >
                <Toast.Header>
                    Errror
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading Errorr ! </Toast.Body>
            </Toast>
            <Button onClick={() => setShow(true)}>Show Toast</Button>
        </React.Fragment>
    );
};

export default ErrorToast;