export default function ErrorPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <h1 className="text-5xl font-bold tracking-tight text-red-600 mb-4">
                Oops!
            </h1>
            <p className="text-xl text-gray-600 max-w-md mb-8">
                Something went wrong. Please try again later.
            </p>
        </main>
    )
}