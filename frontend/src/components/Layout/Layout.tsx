import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from './Layout.module.css'


const Layout: React.FunctionComponent = (): React.ReactElement => {
    
    return (
        <div className={styles.Layout}>
            <Header/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout