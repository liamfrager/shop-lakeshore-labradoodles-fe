import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function ErrorRoute() {
    const [searchParams] = useSearchParams();

    const title = searchParams.get('title');
    const messages = searchParams.getAll('messages');

    return (
        <>
            <h1></h1>
            <ErrorMessage errorTitle={title} errorMessages={messages} />
        </>
    )
}