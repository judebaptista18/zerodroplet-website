import {POST} from './route';
import {serverEnv} from '@/lib/server-env';

jest.mock('@/lib/server-env', () => ({serverEnv: {}}));
jest.mock('next/server', () => ({
  NextResponse: {json: (body: unknown, init?: {status: number}) => ({body, status: init?.status ?? 200})},
}));
const send = jest.fn();
jest.mock('resend', () => ({Resend: jest.fn().mockImplementation(() => ({emails: {send}}))}));

const env = serverEnv as unknown as Record<string, string | undefined>;
const fetchMock = jest.fn();
const enquiry = {
  name: 'Test Visitor', email: 'visitor@example.com', phone: '0123456789',
  service: 'Consultancy', message: 'Please arrange a water treatment site survey.',
};
const request = (body: unknown) => ({json: async () => body}) as Request;

describe('contact API delivery', () => {
  beforeEach(() => {
    Object.keys(env).forEach((key) => delete env[key]);
    env.googleFormsWebhookUrl = 'https://script.google.com/macros/s/deployment-id/exec';
    env.googleFormsWebhookSecret = 'test-secret';
    global.fetch = fetchMock;
    fetchMock.mockReset();
    send.mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  it('forwards all visible fields and only acknowledges a saved response', async () => {
    fetchMock.mockResolvedValue({ok: true, json: async () => ({ok: true, responseId: 'saved-id'})});
    expect(await POST(request({...enquiry, company: ''}))).toEqual({status: 200, body: {ok: true}});
    expect(fetchMock).toHaveBeenCalledWith(env.googleFormsWebhookUrl, expect.objectContaining({
      method: 'POST', body: JSON.stringify({secret: 'test-secret', enquiry}), redirect: 'follow',
    }));
    expect(send).not.toHaveBeenCalled();
  });

  it('accepts enquiries without optional fields', async () => {
    fetchMock.mockResolvedValue({ok: true, json: async () => ({ok: true, responseId: 'saved-id'})});
    expect((await POST(request({...enquiry, phone: undefined, service: undefined}))).status).toBe(200);
  });

  it.each([
    {ok: false},
    {ok: true, json: async () => ({ok: false})},
    {ok: true, json: async () => ({ok: true})},
    {ok: true, json: async () => { throw new Error('HTML login page'); }},
  ])('rejects unsuccessful or unconfirmed delivery', async (response) => {
    fetchMock.mockResolvedValue(response);
    expect((await POST(request(enquiry))).status).toBe(502);
    expect(send).not.toHaveBeenCalled();
  });

  it('handles network errors and timeouts without retrying', async () => {
    fetchMock.mockRejectedValue(new Error('Timeout'));
    expect((await POST(request(enquiry))).status).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it.each([
    {googleFormsWebhookSecret: undefined},
    {googleFormsWebhookUrl: undefined},
    {googleFormsWebhookUrl: 'https://example.com/exec'},
  ])('rejects partial or invalid configuration', async (settings) => {
    Object.assign(env, settings);
    expect((await POST(request(enquiry))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('validates input and discards honeypot submissions before delivery', async () => {
    expect((await POST(request({...enquiry, email: 'invalid'}))).status).toBe(400);
    expect((await POST(request(null))).status).toBe(400);
    expect((await POST(request({...enquiry, company: 'spam'}))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('preserves Resend delivery when Google Forms is disabled', async () => {
    delete env.googleFormsWebhookUrl;
    delete env.googleFormsWebhookSecret;
    Object.assign(env, {resendApiKey: 'key', contactFromEmail: 'from@example.com', contactToEmail: 'to@example.com'});
    send.mockResolvedValue({error: null});
    expect((await POST(request(enquiry))).status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
