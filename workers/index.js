import { Router } from 'itty-router';
import { PostsGet, PostsPost} from './handlers/posts';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const router = Router();

router
  .get('/posts', PostsGet)
  .post('/posts', PostsPost)
  .get('*', () => new Response("Not found", { status: 404 }));


/**
 * Respond with hello worker text
 * @param {Request} request
 */
const handleRequest = (request) => router.handle(request);

