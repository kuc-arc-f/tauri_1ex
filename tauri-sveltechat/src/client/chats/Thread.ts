
import HttpCommon from '../../lib/HttpCommon';
import LibConfig from '../../lib/LibConfig';
import ApiUtil from '../../lib/ApiUtil';
//
const Thread = {
  /**
  *
  * @param chatPostId: number
  *
  * @return
  */   
  getItems : async function (chatPostId: number): Promise<any>
  {
   try{
     const item = {
       chatPostId: chatPostId,
     }      
     const res = await ApiUtil.post('/api/threads/get_list', item);
     return res.data;
   } catch (e) {
     console.error(e);
     throw new Error('Error, getItems');
   }
  },
  /**
  * getChatItems : chat単位リスト
  * @param chatId: number
  *
  * @return
  */   
  getChatItems : async function (chatId: number): Promise<any>
  {
   try{
     const item = {
      chatId: chatId,
     }      
     const target: any = JSON.stringify(item);	
     const res = await fetch("/api/threads/get_list_chat", {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},      
       body: target
     });
     const json = await res.json()
     if (res.status !== 200) {
       console.log(json);   
       throw new Error(await res.text());
     }
     if (json.ret !==  LibConfig.OK_CODE) {
       throw new Error("Error, json.ret <> OK");
     } 
     console.log(json);
//console.log(json);
     return json.data;
   } catch (e) {
     console.error(e);
     throw new Error('Error, getChatItems');
   }
  },
 
  /**
  *
  * @param chatPostId: number
  *
  * @return
  */   
  create : async function (
    chatPostId: number, body: string , chatId: number, userId: number
   ): Promise<void>
   {
    try{
      const item = {
        title: '',
        body: body,
        userId: userId,
        chatId: chatId,
        chatPostId: chatPostId,
      }
      console.log(item);
      const res = await ApiUtil.post('/api/threads/create', item);
      console.log(res);
      return res.data;
    } catch (e) {
      console.error(e);
      throw new Error('Error, create');
    }
   },  
  /**
  *
  * @param id: number
  *
  * @return
  */
  delete: async function (id: number): Promise<any>
   {
    try{
      let ret = false;
      const item = {
        id: id
      }
      console.log(item);
      const res = await ApiUtil.post('/api/threads/delete', item);
      console.log(res);
      return res.data;
    } catch (e) {
      console.error(e);
      throw new Error('Error, delete');
    }
   }, 
  /**
  *
  * @param
  *
  * @return
  */
  search: async function(chatId: number, searchKey: string): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          seachKey : searchKey,
        }
        const json = await HttpCommon.server_post(item, "/threads/search");
        items = json.data
// /console.log(items);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },       
}
export default Thread;
