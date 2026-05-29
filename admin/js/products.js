import { supabase } from './supabase.js'

async function loadProducts() {

    const container = document.getElementById('products-container')

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

    if (error) {
        console.error(error)
        return
    }

    container.innerHTML = ''

    data.forEach(product => {

        const card = document.createElement('div')

        card.className = 'product-card'

        card.innerHTML = `
        
        <img src="${product.image}" alt="${product.title}">

        <div class="product-overlay">

            <h3>${product.title}</h3>

            <p>${product.price} ₼</p>

            <a href="#" class="btn btn-gold">
            Ətraflı
            </a>

        </div>
        
        `

        container.appendChild(card)

    })

}

loadProducts()