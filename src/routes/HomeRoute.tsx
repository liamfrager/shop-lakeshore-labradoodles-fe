import { Link } from "react-router-dom";

export default function HomeRoute() {
    return (
        <div className="hero col">
            <h1>Welcome to the Lakeshore Labradoodles Shop</h1>
            <span>Click <Link to="/products">here</Link> to start shopping!</span>
        </div>
    )
}