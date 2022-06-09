
export const userLanguage = window.navigator.userLanguage || window.navigator.language;

export function formateCurrency({price, currency="EUR", displayCode=true}){
     const formatter = new Intl.NumberFormat(userLanguage, {
         style: 'currency',
         currency: currency,
         currencyDisplay: 'symbol'       
     });
     
    return displayCode ? formatter.format(price) : formatter.format(price).slice(0,-1);
 };

