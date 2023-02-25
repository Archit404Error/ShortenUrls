import { UserContext } from "@/context/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";

const CreateLink = () => {
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
                        <li><a onClick={() => router.push('/')}>Home</a></li>
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
                            <input type="text" placeholder="https://some-site" className="input input-bordered md:w-80" />
                        </label>
                        <label className="input-group mb-10 justify-center">
                            <span>New Link</span>
                            <input type="text" placeholder="new-link" className="input input-bordered md:w-80" />
                        </label>
                        <button className="btn md:w-80">Create!</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CreateLink;