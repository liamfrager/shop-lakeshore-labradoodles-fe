export default function Content(props: { children: React.ReactElement }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
        }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginInline: '5vw',
                flex: '0 1 105em',
                paddingBottom: '2em',
            }}
            >
                {props.children}
            </div>
        </div >
    )
}