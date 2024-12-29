import Link from "next/link";
import React from "react";

const NavBar = () => {
    return (
        <nav className = "bg-red-600 p-4">
            <div className = "container mx-auto">
                <Link href={`/`}>
                <h1 className="text-white text-lg font-bold">グルメサーチ</h1>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;