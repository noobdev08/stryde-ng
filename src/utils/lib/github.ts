export async function checkRepoExists(
    username: string,
    repo: string
): Promise<boolean> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${username}/${repo}`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                cache: "no-store",
            }
        )

        return res.status === 200
    } catch {
        return false
    }
}