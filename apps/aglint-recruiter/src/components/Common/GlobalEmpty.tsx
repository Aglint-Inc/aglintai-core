
export default function GlobalEmpty({ iconSlot, text }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded ">
            <div className="mb-2">
                {iconSlot}
            </div>
            <div className="text-sm text-gray-500">
                {text}
            </div>
        </div>
    );
}