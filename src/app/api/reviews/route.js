import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: 'Missing API Key or Place ID' }, { status: 500 });
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=lv`;
  const googleReviewsUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google');
    }

    const data = await response.json();
    const reviews = Array.isArray(data.reviews) ? data.reviews : [];

    return NextResponse.json({
      reviews,
      averageRating: data.rating || 5.0,
      totalCount: data.userRatingCount || 0,
      googleReviewsUrl,
    });
  } catch (error) {
    console.error('Google API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
