WA.onInit().then(()=>{const n={bronze:"map_bronze.tmj",silver:"map_silver.tmj",gold:"map_gold.tmj"};Object.keys(n).forEach(o=>{const t=document.getElementById(o);t==null||t.addEventListener("click",async()=>{const s=n[o],e=window.location.host,a=`https://play.workadventu.re/_/${Math.random().toString(36).substring(2,15)}/${e}/${s}`;WA.nav.goToRoom(a)})})});
