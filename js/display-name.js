(function(){
const labels = {
qapi: "Otaq qapısı",
seyfqapi: "Seyf qapısı",
seyfqapilar: "Seyf qapısı",
moydadir: "Moydadır",
laminat: "Laminat",
kondisioner: "Kondisioner",
kombi: "Kombi"
};

window.formatProductName = function(value, product = {}){
const raw = String(value || "Məhsul").trim();
const match = raw.match(/^(qapi|seyfqapi|seyfqapilar|moydadir|laminat|kondisioner|kombi)[\s_-]*\(\s*(\d+)\s*\)$/i)
|| raw.match(/^(qapi|seyfqapi|seyfqapilar|moydadir|laminat|kondisioner|kombi)[\s_-]+(\d+)$/i);

if(!match) return raw;

let key = match[1].toLocaleLowerCase("az");
if(key === "qapi" && product.subcategory === "seyf-qapisi"){
key = "seyfqapi";
}

return `${labels[key] || raw} №${match[2]}`;
};
})();
