// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const prerender = true;
export const ssr = false;
import '../index.css';

import LibCookie from '$lib/LibCookie';
import LibConfig from '$lib/LibConfig';
export async function load({ params, url }) {
  //if(url.pathname !== '/login') {
  if(
    !(
      (url.pathname === '/login') ||
      (url.pathname === '/signup')
    )
  ) {
    console.log("url.pathname=" , url.pathname);
    if(typeof(window) !== "undefined") {
      const authValue = LibCookie.getCookie(LibConfig.COOKIE_KEY_AUTH)
      console.log("LibLayout.getCookie=", authValue);
      if(!authValue)
      {
        location.href = '/login';
      }
    }
  }
  return {
    items: []
  };
}
/*
    */
