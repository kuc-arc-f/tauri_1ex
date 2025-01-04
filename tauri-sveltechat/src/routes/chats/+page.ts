export const prerender = true;
export const ssr = false;

import { error } from '@sveltejs/kit';
import LibConfig from '$lib/LibConfig';
//import ChatPost from '../ChatPost';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}

//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try{
    console.log("id=", params.id);
    //const items: any[] = await getItem(params.id);
    return {
        //id: params.id,
        id: 0,
        items: [],
   };  
  } catch (e) {
    console.error(e);
    throw new Error('Error , load');
  }
}
/*
*/