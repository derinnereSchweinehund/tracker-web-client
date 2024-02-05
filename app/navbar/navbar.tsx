import Link from "next/link";

//const navbar = () => {

//}

export default function NavBar() {
    return (
        <div>
            <Link href="/"> Symposium </Link>
            <Link href="/stopwatch"> Stopwatch </Link>
            <Link href="/stopwatch/knower"> Sand </Link>
            <Link href="/timer"> Timer </Link>
            <Link href="/reader"> Reader </Link>
        </div>
    )
};
