const API_BASE="/api";
function getToken(){return localStorage.getItem("flowdesk_token");}
function getUser(){try{return JSON.parse(localStorage.getItem("flowdesk_user")||"null");}catch{return null;}}
async function api(path,options={}){
 const headers={"Content-Type":"application/json",...(options.headers||{})};
 if(getToken())headers.Authorization="Bearer "+getToken();
 const response=await fetch(API_BASE+path,{...options,headers});
 const data=await response.json().catch(()=>({message:"Unexpected server response"}));
 if(!response.ok)throw new Error(data.message||"Request failed");
 return data;
}
function requireLogin(){if(!getToken())location.href="login.html";}
function logout(){localStorage.removeItem("flowdesk_token");localStorage.removeItem("flowdesk_user");location.href="index.html";}
