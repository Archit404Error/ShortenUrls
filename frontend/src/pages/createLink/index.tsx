import { UserContext } from "@/context/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { auth } from "@/firebase/init";

const shortenReq = async (shortUrl: string, origUrl: string) => {
    const res = await fetch(`${process.env.SERVER}/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await auth.currentUser?.getIdToken(true)}`
        },
        body: JSON.stringify({
            origUrl: origUrl,
            shortUrl: shortUrl,
        })
    })

    const json = await res.json();
    return json;
}

const CreateLink = () => {
    const [shortUrl, setShortUrl] = useState<string>('');
    const [origUrl, setOrigUrl] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const user = useContext(UserContext);
    const router = useRouter();
    if (!user?.userInfo) {
        return <div>Not logged in, please authenticate to create links</div>
    }

    return (
        <>
            <Head>
                <title>AppDev Shortlinks</title>
            </Head>
            <main className="artboard p-10">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><a onClick={() => router.push('/login')}>Home</a></li>
                        <li><a>Create</a></li>
                    </ul>
                </div>
                <div className="text-center">
                    <h1 className="text-5xl font-bold mt-10 mb-10">
                        New Short Link
                    </h1>
                    <div className="form-control items-center">
                        <label className="input-group mb-10 justify-center">
                            <span>OG Link</span>
                            <input
                                type="text"
                                placeholder="https://some-site"
                                className="input input-bordered md:w-80"
                                onChange={e => setOrigUrl(e.target.value)}
                            />
                        </label>
                        <label className="input-group mb-10 justify-center">
                            <span>New Link</span>
                            <input
                                type="text"
                                placeholder="new-link"
                                className="input input-bordered md:w-80"
                                onChange={e => setShortUrl(e.target.value)}
                            />
                        </label>
                        <button
                            className="btn md:w-80"
                            onClick={async () => {
                                const res = await shortenReq(shortUrl, origUrl);
                                if (res.success) {
                                    setSuccess(true);
                                    setMessage("Link created successfully!");
                                } else {
                                    setError(true);
                                    setMessage(res.error);
                                }
                            }}
                        >
                            Create!
                        </button>
                        <button
                            className="btn md:w-80 mt-40"
                            onClick={() => router.push("/editLinks")}
                        >
                            Edit Existing Links Instead
                        </button>
                    </div>
                    {success &&
                        <div className="alert alert-success mt-10">
                            <span>{message}</span>
                        </div>
                    }
                    {error &&
                        <div className="alert alert-error mt-10">
                            <span>{message}</span>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default CreateLink;