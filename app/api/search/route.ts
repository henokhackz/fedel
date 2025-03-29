import { NextRequest, NextResponse } from 'next/server';

const OMDB_API_KEY = process.env.OMDB_API_KEY; 
const OMDB_API_URL = 'https://www.omdbapi.com/';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const type = searchParams.get('type');


    if (!query) {
        return NextResponse.json(
            { error: 'Query parameter is required' },
            { status: 400 }
        );
    }

    try {
        const apiUrl = new URL(OMDB_API_URL);
        apiUrl.searchParams.append('apikey', OMDB_API_KEY || '');
        apiUrl.searchParams.append('s', query);
        
        console.log(apiUrl.toString());
        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch data from OMDB' },
                { status: response.status }
            );
        }

        const data = await response.json();

        if (data.Response === 'False') {
            return NextResponse.json(
                { error: data.Error },
                { status: 404 }
            );
        }
           
        console.log(data, "data");
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
    //end
}