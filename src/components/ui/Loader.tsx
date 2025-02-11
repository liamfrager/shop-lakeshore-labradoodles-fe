import './Loader.css';
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