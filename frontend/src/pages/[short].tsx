import { useRouter } from "next/router";
import { useEffect } from "react";

const fetchOrigUrl = async (shortUrl: string) => {
    const res = await fetch(`${process.env.SERVER}/links/${shortUrl}`);
    return await res.json()
}

const Short = () => {
    const router = useRouter();
    const { short } = router.query;

    useEffect(() => {
        if (!short) return;
        (async () => {
            const orig = await fetchOrigUrl(short as string);
            if (orig.success)
                window.location.assign(orig.data);
        })()
    }, [short]);

    return <h1>Redirecting to {short}</h1>;
}

export default Short;