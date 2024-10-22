export default function Loading() {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="flex justify-end items-end">

                <p className="size-8 w-min font-semibold text-xl flex gap-1 animate-pulse duration-100">
                    Loading&nbsp;
                </p>
                <div className="flex gap-1 h-3 pb-2 justify-center items-center">
                    <span className="size-1 bg-black animate-pulse duration-1000 rounded-full bounce-delay-1" />
                    <span className="size-1 bg-black animate-pulse duration-1000 rounded-full bounce-delay-2" />
                    <span className="size-1 bg-black animate-pulse duration-1000 rounded-full bounce-delay-3" />
                </div>
            </div>
        </div>
    )
}