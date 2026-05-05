export async function checkRepoExists(
    username: string,
    repo: string
): Promise<{ exists: boolean; error?: string }> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${username}/${repo}`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 0 },
            }
        )

        if (res.status === 200) return { exists: true }
        if (res.status === 404) return { exists: false, error: "Repo not found" }

        return { exists: false, error: "GitHub API error" }
    } catch {
        return { exists: false, error: "Network error" }
    }
};