const PaddingContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full max-w-7xl px-8 mx-auto">
            {children}
        </div>
    )
}

export default PaddingContainer;