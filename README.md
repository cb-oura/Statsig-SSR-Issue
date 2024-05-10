## Reproduction Steps

1. `yarn install`
2. `NEXT_PUBLIC_STATSIG_CLIENT_KEY=<client token here> STATSIG_SERVER_SECRET=<server token here> yarn dev`
3. Visit `http://localhost:3000/` in your browser.
4. See `InvalidBootstrap` errors in server/client and the lack of SSR
