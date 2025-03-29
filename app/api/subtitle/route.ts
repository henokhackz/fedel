import { OPEN_SUBTITLES_API_KEY, OPEN_SUBTITLES_BASE_API_URL } from "@/lib/constant";



export async function POST(req: Request) {
    try {
        const { omdbId } = await req.json();

        console.log(omdbId, "omdbId");

        const response = await fetch(`${OPEN_SUBTITLES_BASE_API_URL}/subtitles/?imdb_id=${omdbId}&page=1&languages=en&order_by=downloads`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Api-Key': OPEN_SUBTITLES_API_KEY!,
            },
        });
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch subtitles' }), { status: response.status });
        }

        const {data} = await response.json();
       
        const subtitle = data[0]
        

        console.log(subtitle, "subtitle");

        if (!subtitle) {
            return new Response(JSON.stringify({ error: 'Subtitle not found' }), { status: 404 });
        }
 

        return new Response(JSON.stringify({ subtitle: subtitle }), { status: 200 });
    } catch (error) {
        console.error('Error fetching subtitles:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch subtitles' }), { status: 500 });
    }
}