
export const userLanguage = window.navigator.userLanguage || window.navigator.language;

export function formateCurrency({price, currency="EUR", displayCode=true}){
     const formatter = new Intl.NumberFormat(userLanguage, {
         style: 'currency',
         currency: currency,
         currencyDisplay: 'symbol'       
     });
     
    return displayCode ? formatter.format(price) : formatter.format(price).slice(0,-1);
 };

 export function formateDate(date){
     return new Intl.DateTimeFormat(userLanguage, {day:"2-digit", month:"2-digit", year: "numeric", minute:"2-digit", second:"2-digit",hour:"2-digit"}).format(date);
 }

