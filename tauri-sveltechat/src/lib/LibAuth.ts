import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
//
const LibAuth = {
    /**
     *
     * @param key: any
     *
     * @return
     */ 
    getUserId: function(): any
    {
      try {
        let ret = null;
        const key = LibConfig.COOKIE_KEY_AUTH;
        let cookieAuth = LibCookie.getCookie(key);
        /*
        const cookieAuthElem = document.getElementById("cookieAuth") as HTMLInputElement;
        let cookieAuth = cookieAuthElem ? Number(cookieAuthElem.value) : null;
        */
        //console.log("cookieAuth", cookieAuth);
        return Number(cookieAuth);
        //return ret;    
      } catch (e) {
        console.error(e);
      }
    },
}
export default LibAuth;
