type ComponentLayoutProps = {
    children?: React.ReactNode;
}
export default function ComponentLayout(props: ComponentLayoutProps) {
    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0, 0.1)'
            }}
        >
            {props.children}
        </div>
    )
}