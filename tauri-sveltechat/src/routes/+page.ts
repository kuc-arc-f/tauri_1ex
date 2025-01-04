// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import CrudIndex from "../client/chats/CrudIndex";
//import Chat from "../client/chats/Chat";
//import CrudIndex from "./CrudIndex";

const getList = async function (): Promise<any> 
{
  try {   
    let postItem: any[] = [];
    const items = await CrudIndex.getList();
//console.log(postItem);
    return items;
  } catch (e) {
    console.error(e);
  }
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const res = await getList();
  console.log("+page.ts.load");
  console.log(res.data);
  return {
      items: res.data,
      validLogin: true,
  };
//    throw error(404, 'Not found');
}