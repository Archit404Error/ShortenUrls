import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Link {
    _id: any,
    shortUrl: string,
    originalUrl: string,
}

const LinkCard = ({ shortUrl, originalUrl, _id }: any) => {
    const [edit, setEdit] = useState(false)
    const [short, setShort] = useState(shortUrl)
    const [orig, setOrig] = useState(originalUrl)

    const updateLink = async () => {
        const res = await fetch(`${process.env.SERVER}/links/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shortUrl: short,
                originalUrl: orig
            })
        })

        const json = await res.json();
        return json;
    }

    return (
        <div className="card bg-gray-800 md:w-5/12 mb-10 text-left">
            <div className="card-body">
                <div className="flex">
                    <div className="flex-auto">
                        {!edit &&
                            <>
                                <h1 className="font-serif text-2xl mb-5">
                                    Alias: {short}
                                </h1>
                                <h1 className="font-serif text-2xl">
                                    Original: {orig}
                                </h1>
                            </>
                        }
                        {edit &&
                            <>
                                <h1>Alias</h1>
                                <input
                                    type="text"
                                    value={short}
                                    onChange={e => setShort(e.target.value)}
                                    className="input input-bordered md:w-80 mb-5"
                                />
                                <h1>Original</h1>
                                <input
                                    type="text"
                                    value={orig}
                                    onChange={e => setOrig(e.target.value)}
                                    className="input input-bordered md:w-80"
                                />
                            </>
                        }
                    </div>

                    <div className="card-actions justify-end flex-auto">
                        <button className="btn" onClick={() => setEdit(!edit)}>{edit ? "Cancel" : "Edit"}</button>
                    </div>
                    {edit &&
                        <button className="btn ml-5" onClick={() => { updateLink(); setEdit(!edit) }}>Save</button>
                    }
                </div>
            </div>
        </div>
    )
}

const EditLinks = () => {
    const [links, setLinks] = useState<Link[]>([])
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const allData = await fetch(`${process.env.SERVER}/links`)
            setLinks(await allData.json())
        })()
    }, [])

    return (
        <>
            <Head>
                <title>AppDev Shortlinks</title>
            </Head>
            <div className="p-5">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><a onClick={() => router.push('/')}>Home</a></li>
                        <li><a onClick={() => router.push('/createLink')}>Create</a></li>
                        <li><a>Edit</a></li>
                    </ul>
                </div>
                <div className="text-center">
                    <h1 className="text-6xl mt-10 mb-10 font-serif">Edit Existing Links</h1>
                    <div className="flex justify-center">
                        {
                            links.map((link, idx) => (
                                <LinkCard key={`link${idx}`} {...link} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLinks;