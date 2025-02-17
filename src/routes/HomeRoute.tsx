import { Link } from "react-router-dom";

export default function HomeRoute() {
    return (
        <div className="hero col">
            <div className="bubble">
                <h1>Welcome to the Lakeshore Labradoodles Shop!</h1>
                <p>Click <Link to="/products">here</Link> to start shopping!</p>
            </div>
        </div>
    )
}