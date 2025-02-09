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
                marginInline: '5em',
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: '105em',
                paddingBottom: '2em',
            }}
            >
                {props.children}
            </div>
        </div >
    )
}