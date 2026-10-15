/* PHOTOGRAPHY GALLERY DATA
   Replace the placeholder path with an actual photo file after you add it.
   Leave unknown metadata blank instead of guessing dates or locations. */
const photos = [
  {src:'',title:'City in motion',date:'',place:'New York City',event:''},
  {src:'',title:'A quieter corner',date:'',place:'',event:''},
  {src:'',title:'After the lights',date:'',place:'',event:'Concert / event (if applicable)'},
  {src:'',title:'Everyday details',date:'',place:'',event:''}
];
const gallery=document.getElementById('creative-photo-gallery');
if(gallery){
  photos.forEach((photo,index)=>{
    const figure=document.createElement('figure');figure.className='cw-photo';figure.style.margin='0';
    if(photo.src){const img=document.createElement('img');img.src=photo.src;img.alt=photo.title;img.loading='lazy';figure.append(img)}
    else{const placeholder=document.createElement('div');placeholder.className='cw-placeholder';placeholder.textContent=`Photo ${index+1} — add your image in creative.js`;figure.append(placeholder)}
    const caption=document.createElement('figcaption');caption.className='cw-photo-caption';
    const name=document.createElement('strong');name.textContent=photo.title;
    const meta=document.createElement('small');meta.textContent=[photo.place,photo.date,photo.event].filter(Boolean).join(' · ')||'Details coming soon';
    caption.append(name,meta);figure.append(caption);gallery.append(figure);
  });
}
