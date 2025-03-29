import { OPEN_SUBTITLES_API_KEY, OPEN_SUBTITLES_BASE_API_URL } from '@/lib/constant';

export async function POST() {
  const username = process.env.USER_NAME;
  const password = process.env.PASSWORD;



console.log(username, "🔑 Auth Username", password,'password UPDATED');
  if (!username || !password || !OPEN_SUBTITLES_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
  }

  try {
    const response = await fetch(`${OPEN_SUBTITLES_BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': OPEN_SUBTITLES_API_KEY!,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

   console.log(response, "🔑 Auth Response");
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 401 });
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      const token = data.token; // Assuming the token is in the JSON response
      console.log(data, "🔑 Auth Token");
      return new Response(JSON.stringify({ token }), { status: 200 });
    } else if (contentType.includes('text/html')) {
      const data = await response.json();

      return new Response(JSON.stringify({ error: 'Unexpected response type: HTML' }), { status: 500 });
    } else {
      console.error('Unexpected response type:', contentType);
      return new Response(JSON.stringify({ error: 'Unexpected response type' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error authenticating:', error);
    return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 500 });
  }
}
