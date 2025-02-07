import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <span>{`Copyright © ${new Date().getFullYear()} `}</span>
            <a href="https://lakeshorelabradoodles.com" target="_blank" rel="noopener noreferrer">
                Lakeshore Labradoodles
            </a>
            <span>. All rights reserved.</span>
        </footer >
    )
}