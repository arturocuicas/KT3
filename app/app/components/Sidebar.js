import Link from "next/link";

export default function Sidebar() {
    return (
        <div className={"flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 pl-5 transition-all duration-200 ease-in-out -translate-x-64 text-white"}>
            <h1 className={"leading-loose font-black text-5xl mb-5"}>
                <Link href="/">KT3</Link>
            </h1>
            <nav>
                <ul>
                    <li className={"mb-4"}><Link href="/entries">Entries</Link></li>
                    <li className={"mb-4"}><Link href="/accounts">Accounts</Link></li>
                    <li className={"mb-4"}><Link href="/account-groups">Account Groups</Link></li>
                </ul>
            </nav>
        </div>
    )
}