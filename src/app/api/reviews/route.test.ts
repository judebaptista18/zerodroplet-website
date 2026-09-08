import {GET} from './route';

jest.mock('next/server', () => ({NextResponse: {
  json: (body: unknown, init?: {status?: number; headers?: unknown}) => ({body, status: init?.status ?? 200, headers: init?.headers}),
}}));
const fetchMock = jest.fn();
const originalKey = process.env.GOOGLE_PLACES_API_KEY;
const originalPlace = process.env.GOOGLE_PLACE_ID;

describe('Google reviews API', () => {
  beforeEach(() => {
    process.env.GOOGLE_PLACES_API_KEY = 'private-api-key';
    process.env.GOOGLE_PLACE_ID = 'test-place';
    global.fetch = fetchMock;
    fetchMock.mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    if (originalKey === undefined) delete process.env.GOOGLE_PLACES_API_KEY;
    else process.env.GOOGLE_PLACES_API_KEY = originalKey;
    if (originalPlace === undefined) delete process.env.GOOGLE_PLACE_ID;
    else process.env.GOOGLE_PLACE_ID = originalPlace;
    jest.restoreAllMocks();
  });

  it('does not call Google without credentials', async () => {
    delete process.env.GOOGLE_PLACES_API_KEY;
    expect(await GET()).toMatchObject({status: 200, body: {available: false}});
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns ratings, original review order and attributions without exposing the key', async () => {
    const reviews = [2, 5].map((rating) => ({name: `review-${rating}`, rating,
      authorAttribution: {displayName: 'Test author', uri: 'https://www.google.com/maps/contrib/test'},
      originalText: {text: 'A test review.'}, googleMapsUri: 'https://www.google.com/maps/reviews/test',
    }));
    fetchMock.mockResolvedValue({ok: true, json: async () => ({rating: 4.2, userRatingCount: 12, reviews})});
    const result = await GET();
    expect(result).toMatchObject({status: 200, headers: {'Cache-Control': 'private, no-store'}, body: {
      available: true, rating: 4.2, reviews, writeReviewUrl: 'https://search.google.com/local/writereview?placeid=test-place',
    }});
    expect(JSON.stringify(result)).not.toContain('private-api-key');
    expect(fetchMock).toHaveBeenCalledWith('https://places.googleapis.com/v1/places/test-place?languageCode=en', expect.objectContaining({
      cache: 'no-store', headers: expect.objectContaining({'X-Goog-Api-Key': 'private-api-key'}),
    }));
  });

  it.each([
    {ok: false},
    {ok: true, json: async () => ({rating: 9})},
    {ok: true, json: async () => ({googleMapsUri: 'javascript:alert(1)'})},
    {ok: true, json: async () => { throw new Error('Invalid JSON'); }},
  ])('handles upstream errors and invalid data', async (response) => {
    fetchMock.mockResolvedValue(response);
    expect(await GET()).toMatchObject({status: 502, body: {available: false}});
  });

  it('handles network timeouts', async () => {
    fetchMock.mockRejectedValue(new Error('Timeout'));
    expect(await GET()).toMatchObject({status: 502, body: {available: false}});
  });
});
