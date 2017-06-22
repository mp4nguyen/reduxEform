
let baseUrl = 'https://dev1.redimed.com.au:3065';
// let baseUrl = 'http://192.168.2.11:3015';
let printUrl = 'https://testapp.redimed.com.au:3013';
let baseImageUrl = 'https://dev1.redimed.com.au:3055';


export function printUrl(url){
  return printUrl + url;
}

export function apiUrl(url){
  return baseUrl + url;
}

export function apiImageUrl(url){
  return baseImageUrl + url;
}
