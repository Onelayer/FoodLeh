<template>
    <div>
        <header>
            {{cart.length}} in cart
            <button @click="navigateToCart()">View Cart</button>
            <button @click="navigateToProducts()">View Products</button>
        </header>
        <div v-if="page === 'cart'">
            <h1>Your Cart</h1>
            <div v-for="(product, index) in cart" :key="index">
                {{ product.name }}
                <img :src="product.image"/>
                <div>{{ product.cost }}</div>
                <button v-on:click="removeItemFromCart(product)">Remove Item</button>
            </div>
        </div>
        <div v-else-if="page === 'products'">
            <h1>Products</h1>
            <div class="product">
                <div v-for="(product, index) in products" :key="index">
                    {{ product.name }}
                    <img :src="product.image"/>
                    <button @click="addItemToCart(product)">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: () => {
        return ({
            page: 'products',
            cart: [],
            products: [
                {
                    name: 'Kuey Png',
                    cost: "$3",
                    image: 'https://mustsharenews.com/wp-content/uploads/2019/04/900x900x53379962_317164412324473_3652592381486313999_n.jpg.pagespeed.ic.YX2zFpByYY.webp',
                },
                {
                    name: 'Gong Bao Ji Fan',
                    cost: "$5",
                    image: 'https://static01.nyt.com/images/2017/01/29/dining/29COOKING-GONGBAOCHICKEN2/29COOKING-GONGBAOCHICKEN2-superJumbo.jpg',
                }
            ]
        });
    },
    methods: {
        addItemToCart(product) {
            this.cart.push(product);
            console.log(this.cart);

        },
        navigateToCart(){
            this.page = 'cart';
        },
        navigateToProducts() {
            this.page = 'products';
        },
        removeItemFromCart(product) {
            const index = this.cart.indexOf(product);
            this.cart.splice(index, 1); //2nd param is the number of elements to remove
        },
    },
}

</script>

<style scoped>
.products {
    display:grid;
    grid-template-columns: 1fr 1fr;
}

header {
    height: 100px;
    color: 'blue';
    text-align: right;
}
</style>
