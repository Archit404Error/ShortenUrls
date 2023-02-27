import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const fetchOrigUrl = async (shortUrl: string) => {
    const res = await fetch(`${process.env.SERVER}/links/${shortUrl}`);
    return await res.json()
}

const Short = () => {
    const router = useRouter();
    const { short } = router.query;
    const [message, setMessage] = useState(`Redirecting...`)

    useEffect(() => {
        if (!short) return;
        (async () => {
            const orig = await fetchOrigUrl(short as string);
            if (orig.success)
                window.location.assign(orig.data);
            else
                setMessage("Err: Invalid link")
        })()
    }, [short]);

    return <h1>{message}</h1>;
}

export default Short;