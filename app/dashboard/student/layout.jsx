export const metadata = {
    title: 'Casa Chirilagua | Students Dashboard',
    descrtiption: "Primary page for managing students.",
}
const layout = ({ children }) => {
    return (
        <div className="dash-container">
            {children}
        </div>
    )
}

export default layout