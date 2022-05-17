import React from "react";
import styles from "./Layout.module.css";

type LayoutProps = {
    children: React.ReactNode
}

export default function({ children }: LayoutProps) {
    return (<div className={styles.layout}>
        <header className='navStyling'>
            <nav>
                <ul>
                    <li>English</li>
                    <li>Help</li>
                    <li>Sign Up</li>
                    <li>Log In</li>
            </ul>
            </nav>
            </header>
        <main>
            {children}
        </main>
        <footer>
            footer goes here
        </footer>
    </div>)
}
