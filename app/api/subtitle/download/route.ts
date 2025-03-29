import { OPEN_SUBTITLES_API_KEY, OPEN_SUBTITLES_BASE_API_URL } from "@/lib/constant";



export async function POST(req: Request) {
    const { file_id , token} = await req.json()
    const response = await fetch(`${OPEN_SUBTITLES_BASE_API_URL}/download`, {
        method: 'POST',
        headers: {
            'Token': token,
        },
        body: JSON.stringify({
            'file_id': file_id,
        }),
    });
    if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch subtitles' }), { status: response.status });
    }
    const data = await response.json();
    console.log(data, "data");
    return new Response(JSON.stringify(data), { status: 200 });
}