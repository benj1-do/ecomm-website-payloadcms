export default function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-[300px]">
            <img
                src="./spinner.svg"
                className="w-10 h-10 animate-spin"
                alt="Loading icon"
            />
        </div>
    );
}