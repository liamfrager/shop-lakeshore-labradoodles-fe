import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ErrorMessage.css';

interface ErrorMessageProps {
    errorTitle?: string | null;
    errorMessages?: string[] | null;
}
export default function ErrorMessage(props: ErrorMessageProps) {
    return (
        <div className='bubble row loading-error'>
            <FontAwesomeIcon icon={faTriangleExclamation} className='error-icon' />
            <div className='error-message'>
                <h3>{props.errorTitle ?? 'Uh oh!'}</h3>
                {props.errorMessages && props.errorMessages.length > 0 ? (
                    props.errorMessages.map((message, index) => <h4 key={index}>{message}</h4>)
                ) : (
                    <>
                        <h4>Something went wrong!</h4>
                        <h4>Please check your internet connection and try again later.</h4>
                    </>
                )}
            </div>
        </div>
    )
}