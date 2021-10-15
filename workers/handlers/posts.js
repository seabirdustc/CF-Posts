const headers = {
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Methods": "GET, POST",
  'Content-type': 'application/json'
};

export const PostsGet = async () => {
  const { keys } = await POSTS_KV.list();
  const promises = keys.map(async (key) => {
    return await POSTS_KV.get(key.name);
  })
  const body = await Promise.all(promises);
  return new Response(JSON.stringify(body), { headers });
}

export const PostsPost = async (request) => {
  const body = await request.json();
  try {
    const id = `${body.username || 'anonymous'}-${new Date().valueOf()}`;
    await POSTS_KV.put(id, JSON.stringify({...body, id, published_at: new Date()}))
    return new Response('Success',{
      headers,
      status: 200
    });
  } catch (e) {
    return new Response('Failure',{
      status: 500
    });
  }
}

