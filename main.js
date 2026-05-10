// Adicione os scripts do Firebase no <head> do marketplace.html se não existirem
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>

function loadProducts() {
    const container = document.getElementById('product-list');
    
    // Inicializar Firebase (mesma config do admin)
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();

    database.ref('produtos').on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            container.innerHTML = `<div class="py-20 text-center"><p class="text-zinc-800 font-heavy italic uppercase text-2xl opacity-20">No Drops Yet</p></div>`;
            return;
        }

        const produtos = Object.values(data).reverse();
        container.innerHTML = produtos.map(p => `
            <div class="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden group" data-aos="fade-up">
                <div class="relative h-64 overflow-hidden">
                    <img src="${p.image}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                    <div class="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span class="text-[9px] font-black uppercase tracking-tighter">${p.status === 'disponivel' ? 'In Stock' : 'Limited'}</span>
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="font-heavy italic text-sm uppercase mb-1">${p.name}</h3>
                    <p class="text-red-700 font-black text-lg mb-4">${p.price} MT</p>
                    <button onclick="addToBag('${p.id}', '${p.name}', '${p.price}', '${p.image}')" class="w-full bg-white text-black py-3 rounded-xl font-heavy text-[10px] uppercase hover:bg-red-700 hover:text-white transition-all">
                        Add to Bag
                    </button>
                </div>
            </div>
        `).join('');
    });
}
