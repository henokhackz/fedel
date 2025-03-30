import { OPEN_SUBTITLES_API_KEY, OPEN_SUBTITLES_BASE_API_URL } from "@/lib/constant";
import { cleanSubtitle } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const { file_id, token } = await req.json();
        if (!token || !file_id) {
            return new Response(JSON.stringify({ error: "Missing credentials" }), { status: 400 });
        }

        // Request download link from OpenSubtitles API
        const response = await fetch(`${OPEN_SUBTITLES_BASE_API_URL}/download`, {
            method: "POST",
            headers: {
                "Api-Key": OPEN_SUBTITLES_API_KEY!,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ file_id }),
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch subtitles" }), { status: response.status });
        }

        const { link, file_name } = await response.json();

        // Download the subtitle file
        const subtitleResponse = await fetch(link);
        if (!subtitleResponse.ok) {
            return new Response(JSON.stringify({ error: "Failed to download subtitle file" }), { status: 500 });
        }

        const subtitleText = await subtitleResponse.text();

        // Process Subtitle (Example: Remove timestamps)
        const cleanedSubtitle = cleanSubtitle(subtitleText);

        return new Response(JSON.stringify({ file_name, cleaned_subtitle: cleanedSubtitle }), { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return new Response(JSON.stringify({ error: "Internal Server Error", message: errorMessage }), { status: 500 });
    }
}
