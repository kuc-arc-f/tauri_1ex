import LibConfig from '../../lib/LibConfig';
import Crud from './Crud';
import HttpCommon from '../../lib/HttpCommon';
import ApiUtil from '../../lib/ApiUtil';
//
const CrudCreate = {

  /**
   * addItem:
   * @param key: any
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    try{
      let values = Crud.getInputValues();
      values.userId = 0;
      //const postData = { key: 'example', value: 'data' };
      const res = await ApiUtil.post('/api/chats/create', values);
      return res.data;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
        const result = await this.addItem();
        console.log("result=", result);
        if(result === true) {
          window.location.href = '/chats';
        }
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}

export default CrudCreate;
