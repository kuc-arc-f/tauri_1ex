import LibConfig from '../../lib/LibConfig';
import LibAuth from '../../lib/LibAuth';
import HttpCommon from '../../lib/HttpCommon';
import ApiUtil from '../../lib/ApiUtil';
//
const ChatPost = {
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
        const json = await HttpCommon.server_post(item, "/chat_posts/search");
        items = json.data
// /console.log(items);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },   
  /**
  *
  * @param
  *
  * @return
  */
  addItem: async function(id: number)
  {
    try {
      let ret = {};
      const elemBody = document.querySelector<HTMLInputElement>('#body');
      const item = {
        title: '',
        chatId: Number(id),
        body: elemBody?.value,
        userId : LibAuth.getUserId(),
      }
      console.log(item);
      const res = await ApiUtil.post('/api/chat_posts/create', item);
      //return res.data;
      return true;
    } catch (error) {
        console.error(error);
    }    
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */ 
  getList: async function(chatId: number): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          userId : 0,
        }
        const res = await ApiUtil.post('/api/chat_posts/get_list', item);
        return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  /**
  *
  * @param
  *
  * @return ret: true(update)
  */     
  delete : async function (id: number): Promise<void>
  {
    try {
      const item = {
        id: id,
      }
      const res = await ApiUtil.post("/api/chat_posts/delete" , item);
      return res.data;
console.log(res)      
    } catch (e) {
      console.log(e);
      throw new Error('error, delete');
    }
  },  
  /**
  *
  * @param chatId: number
  *
  * @return Promise
  */      
  getLastTime : async function (chatId: number, userId: number): Promise<any>
  {
    try {
      let ret = {};
      const item = {
        chatId: chatId,
        userId: userId,
      }
      const json = await HttpCommon.server_post(item, "/chat_posts/get_last_time");
      if(json.ret === LibConfig.OK_CODE) {
//console.log(json.data);
        ret = json.data;
      }
      return ret;       
    } catch (e) {
      console.log(e);
      throw new Error('error, getLastTime');
    }
   },
  /**
  * 
  * @param chatId: number
  *
  * @return Promise
  */       
  get : async function (chatId: number): Promise<any>
  {
    try {
      let ret = {};
      const item = {
        id: chatId,
        userId : 0,
      }
      const postData = { key: 'example', value: 'data' };
      const res = await ApiUtil.post('/api/chat_posts/get', item);
      return res.data;
    } catch (e) {
      console.log(e);
      throw new Error('error, get');
    }
   },
}
export default ChatPost;
