export default function Content(props: { children: React.ReactElement }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}
        >
            <div style={{
                marginInline: '1em',
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: '105em',
                paddingBottom: '1em',
            }}
            >
                {props.children}
            </div>
        </div >
    )
}