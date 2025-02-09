import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loader.css';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from './ErrorMessage';

interface LoaderProps {
    loading?: any;
}

export default function Loader(props: LoaderProps) {
    return (
        props.loading === undefined ? (
            <div className='loader-container'>
                <div className='loader'></div>
                <h3 className='loader-text'>Loading...</h3>
            </div>
        ) : (
            <ErrorMessage />
        )
    )
}