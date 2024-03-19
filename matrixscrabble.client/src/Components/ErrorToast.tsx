import React from 'react';
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, selectErrorMessage } from '../redux/slices/errorSlice';
import { AppDispatch } from '../redux/store';

const ErrorToast: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [show, setShow] = useState(false);

    const errorMessage = useSelector(selectErrorMessage);
    console.log(errorMessage);

    useEffect(() => {
        console.log(errorMessage);
        if (errorMessage) {
            setShow(true);
            setTimeout(() => { dispatch(clearError()) }, 3000)

        }
    }, [errorMessage, dispatch]);


    return (<React.Fragment>
        {(<React.Fragment>
            <Toast bg="warning" show={show} delay={3000} onClose={() => setShow(false)} autohide>
                <Toast.Header>
                    Errror
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading Errorr ! {errorMessage}</Toast.Body>
            </Toast>
        </React.Fragment>
        )}
    </React.Fragment>
    )
};

export default ErrorToast;
