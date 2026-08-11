const pokedex = document.getElementById('pokedex');
const btnPokemon = document.getElementById('btn-pokemon');

/*btnPokemon.addEventListener('click' , async()=>{
    const findPokemon = await fetch ('https://pokeapi.co/api/v2/pokemon/67'); //รอเพื่อรอว่ารันข้อมูลมารึยัง
    const data = await findPokemon.json(); //รอเพื่อรอว่าแปลงข้อมูลมาเป็น json รึยัง
    console.log(data); //เพื่อเช็ค
    //pokedex.innerHTML = `${data.name} <img src="${data.sprites.front_default}">`;
    const div = document.createElement('div'); //สร้างกล่องdiv
    const img = document.createElement('img'); //
    img.src = data.sprites.front_default; //ดึงรูปจากdata ของ เว็บ api
    div.append(img); 
    pokedex.append(div); //ทุกครั้งที่มันสร้าง มันจะสร้างขึ้นมาใหม่เพื่อรอวนอีกครั้ง
}); */


btnPokemon.addEventListener('click', async () => {
    // สุ่ม ID
    const randomId = Math.floor(Math.random() * 151) + 1;

    // ดึงข้อมูล
    const findPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await findPokemon.json();

    // สร้างการ์ดหลัก + ใส่ระบบกดเพื่อลบ
    const div = document.createElement('div');
    div.classList.add('card');
    div.addEventListener('click', () => {
        div.remove();
    });

    // สร้าง ID โปเกมอน
    const pokemonId = document.createElement('span');
    pokemonId.classList.add('pokemon-id');
    pokemonId.textContent = `#${data.id}`;

    // สร้างรูปโปเกมอน
    const img = document.createElement('img');
    img.src = data.sprites.front_default;

    // สร้างชื่อโปเกมอน
    const name = document.createElement('p');
    name.textContent = data.name;

    // ประกอบร่างเข้าการ์ด
    div.append(pokemonId);
    div.append(img);
    div.append(name);

    // แสดงผลบนหน้าเว็บ
    pokedex.append(div);
});