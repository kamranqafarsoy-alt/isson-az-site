export async function optimizeImage(file){
if(!file || !file.type.startsWith("image/")) return file;
if(file.type === "image/gif" || file.type === "image/svg+xml") return file;

const bitmap = await createImageBitmap(file);
const maxDimension = 2000;
const scale = Math.min(1,maxDimension / Math.max(bitmap.width,bitmap.height));

if(scale === 1 && file.size < 900 * 1024){
bitmap.close();
return file;
}

const canvas = document.createElement("canvas");
canvas.width = Math.max(1,Math.round(bitmap.width * scale));
canvas.height = Math.max(1,Math.round(bitmap.height * scale));
canvas.getContext("2d",{alpha:false}).drawImage(bitmap,0,0,canvas.width,canvas.height);
bitmap.close();

const blob = await new Promise((resolve,reject)=>{
canvas.toBlob(result => result ? resolve(result) : reject(new Error("Şəkil optimallaşdırılmadı")),"image/webp",.84);
});

const baseName = file.name.replace(/\.[^.]+$/,"");
return new File([blob],`${baseName}.webp`,{
type:"image/webp",
lastModified:Date.now()
});
}
