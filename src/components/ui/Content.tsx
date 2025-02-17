import PawPrints from "./PawPrints";
import './Content.css';

export default function Content(props: { children: React.ReactElement }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
        }}
        >
            <PawPrints />
            <div className="content-container">
                {props.children}
            </div>
        </div >
    )
}