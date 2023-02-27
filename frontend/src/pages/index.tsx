import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => window.location.assign("https://cornellappdev.com"), []);
    return <h1>Redirecting to AppDev</h1>;
}

export default Home;