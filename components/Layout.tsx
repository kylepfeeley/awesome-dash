import { layout } from "@chakra-ui/react"
import Header from '../components/Header'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            {/* Footer */}
        </>
    )
}

export default Layout;