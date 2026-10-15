/* PHOTOGRAPHY GALLERY DATA*/
const photos = [
  {src:'traffic.jpg',title:'Night Road',date:'07/11/2026',place:'Westhampton, NY'}, 
  {src:'nycbridge.jpg',title:'Manhattan Bridge',date:'07/05/2026',place:'NYC'},
  {src:'nightview.jpg',title:'City At Sunset',date:'11/29/2025',place:'Lake Lugano, Switzerland'},
  {src:'fog.jpg',title:'Foggy Morning',date:'11/16/2025',place:'Paris'},
  {src:'beach.jpg',title:'Beach Volleyball',date:'10/31/2025',place:'Barcelona'},
  {src:'house.jpg',title:'Within Nature',date:'10/31/2025',place:'Park Guell, Barcelona'},
  {src:'bridge.jpg',title:'Bridgerton Bridge',date:'10/17/2025',place:'Pior Park, UK'},
  {src:'boat.jpg',title:'Boat',date:'10/11/2025',place:'Venice'},
  {src:'shop.jpg',title:'Little Shop',date:'09/27/2025',place:'UK'},
  {src:'cats.jpg',title:'Cats',date:'09/12/2025',place:'London, UK'}
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
