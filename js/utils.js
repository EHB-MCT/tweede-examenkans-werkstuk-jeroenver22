"use strict";
// Returned hemzelf, curly brackets hoeft niets indien een arg
//async zet je voor de functie
export const api = async (url, method="get", body=null) => {

   const resp = await fetch(url, { 
      method, 
      //if body is true
      body: body && JSON.stringify(body)
   });
   // veranderd data naar json
   return await resp.json();

};
//export op verschillende manieren
// 1. default waarde exp
// 2. object exporteren
// 3. export voor constante object
