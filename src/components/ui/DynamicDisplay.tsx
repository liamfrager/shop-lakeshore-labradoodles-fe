export default function DynamicDisplay(props: { children: React.ReactElement[] }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(20em, 1fr))',
            gap: '1em',
            marginTop: '2em',
        }}>
            {props.children}
        </div>
    )
}