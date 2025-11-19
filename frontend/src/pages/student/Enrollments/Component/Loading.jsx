import Layout from "../../../../components/Layout";

function Loading(){
    return (
        <div className="min-h-screen w-screen bg-white">
            <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="h-[300px] rounded-2xl border bg-slate-100 animate-pulse"
                />
                ))}
            </div>
            </Layout>
        </div>
    )
}

export default Loading;