export default function Logo() {
    const logoURL = '/static/logo.png';
    return (
        <img src={logoURL} alt="Lakeshore Labradoodles Logo" style={{ userSelect: 'none', cursor: 'pointer', maxHeight: '6em' }} />
    )
}