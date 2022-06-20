const selectElement = (element, parentElement = document) => parentElement.querySelector(element)
const createDOM = (element) => document.createElement(element)
const elProductList = selectElement(".product-list")
const elProductTemplate = selectElement(".product-template").content
const elProductName = selectElement("#product-title")
const elProductPrice = selectElement("#price")
const elProductManufacture = selectElement("#product-manufacturer")
const elBenefits = selectElement("#benefits")
const elAddProductForm = selectElement(".add-product-form")
const elManufacturesFilter = selectElement("#manufacturer")
const elProductSearch = selectElement("#search")
const elPriceFrom = selectElement("#from")
const elPriceTo = selectElement("#to")
const elSortBy = selectElement("#sortby")
const elFilterForm = selectElement("#search-form")
const editProductModal = selectElement("#edit-product-modal")
const elEditFormTilte = selectElement("#edit-product-title")
const elEditFormPrice = selectElement("#edit-price")
const elEditFormManufacture = selectElement("#edit-product-manufacturer")
const elEditFormBenefits = selectElement("#edit-benefits")
const elEditForm = selectElement("#edit-form")
const editModalCloseBtn = selectElement("#btn-close")
const elEditBtn = selectElement("#edit")


products = JSON.parse(localStorage.getItem('products'))

const getTime = (time) => {
    const date = new Date(time)
    let releaseDate = ''
    releaseDate += `${date.getDate()}`
    releaseDate += `/${date.getMonth() + 1}`
    releaseDate += `/${date.getFullYear()}`
    return releaseDate
} 

const manufacturesRender = (manufacturesArr, optionList) => {
    manufacturesArr.forEach(element => {
        const option = createDOM("option", element.name)
        option.value = element.name
        option.textContent = element.name
        optionList.append(option)
    });
}

manufacturesRender(manufacturers, elProductManufacture)
manufacturesRender(manufacturers, elEditFormManufacture)
manufacturesRender(manufacturers, elManufacturesFilter)

function addProduct(evt){
    evt.preventDefault()
    
    let product = {}
    product.title = elProductName.value
    product.price = elProductPrice.value
    product.model = elProductManufacture.value
    product.benefits = elBenefits.value.split(",")
    product.img = "https://picsum.photos/300/200"
    product.addedDate = new Date().toISOString()
    product.id = 123 + products.length
    
    products.push(product)
    productRender(products, elProductList)
    elAddProductForm.reset()
}
elAddProductForm.addEventListener("submit", addProduct)

function productRender(productsArr, element) {
    element.innerHTML = null
    
    productsArr.forEach(product => {
        const productTemplate = elProductTemplate.cloneNode(true)
        
        selectElement(".card-img-top", productTemplate).src = product.img
        selectElement("#one-product", productTemplate).setAttribute("data-id", product.id)
        selectElement(".card-title", productTemplate).textContent = product.title
        selectElement(".card-discount-price", productTemplate).textContent = product.price - (product.price/100*20)
        selectElement(".card-price", productTemplate).textContent = product.price
        selectElement(".gadget-firm", productTemplate).textContent = product.model
        selectElement(".post-data", productTemplate).textContent = getTime(product.addedDate)
        const elProductBenefitsList = selectElement(".product-benefit-list", productTemplate)
        
        product.benefits.forEach(benefit => {
            let newBenefit = createDOM("li")
            newBenefit.textContent = benefit
            newBenefit.className = "badge bg-primary me-1 mb-1 product-benefit"
            
            elProductBenefitsList.append(newBenefit)
        })
        
        element.append(productTemplate)
        let elProductsCount = selectElement(".count").textContent = "count: " + products.length
        localStorage.setItem('products', JSON.stringify(products))
        products = JSON.parse(localStorage.getItem('products'))
    });
}
function searchProduct(evt) {
    evt.preventDefault()
    
    const filteredProducts = products.filter((product) =>{
        let regex = new RegExp(elProductSearch.value, 'gi')
        let productName = product.title.match(regex)
        
        let price = !elPriceTo.value ? Infinity : elPriceTo.value

        let manufacture = elManufacturesFilter.value === "0" ? product.model : elManufacturesFilter.value === product.model

        
        
        return product.price >= elPriceFrom.value && product.price <= price && productName && manufacture;
    });
    switch (elSortBy.value) {
        case "1":
            filteredProducts.sort((a, b) => {
                if(a.title < b.title){return -1}
                if(a.title > b.title) {return 1}
                else {return 0}
            })
            break;

        case "2":
            filteredProducts.sort((a, b) => a.price - b.price)
            break;
        
        case "3":
            filteredProducts.sort((a, b) => b.price - a.price)
            break;
            
            default:
                elProductList.append('topilmadi')
    }
   
    productRender(filteredProducts, elProductList)
}
const onListClick = (event) => {
    if(event.target.matches(".delete")){
        const currentCardId = event.target.closest("#one-product").dataset.id
        const currentProduct = products.findIndex(product => product.id === +currentCardId)
        products.splice(currentProduct, 1)
        productRender(products, elProductList)
    }else if(event.target.matches(".edit")){
        const currentCardId = event.target.closest("#one-product").dataset.id
        const currentProductIndex = products.findIndex(product => product.id === +currentCardId)

        elEditFormTilte.value = products[currentProductIndex].title
        elEditFormPrice.value = products[currentProductIndex].price
        elEditFormManufacture.value = products[currentProductIndex].model
        elEditFormBenefits.value = products[currentProductIndex].benefits

        const editProduct = (evt) => {
            evt.preventDefault()
            if(elEditFormTilte.value.trim() && elEditFormManufacture.value !== '' && elEditFormPrice.value >= 0) {
                let product = {
                    id: products[currentProductIndex].id,
                    img: products[currentProductIndex].img,
                    addedDate: products[currentProductIndex].addedDate,
                    title: elEditFormTilte.value,
                    price: +elEditFormPrice.value,
                    model: elEditFormManufacture.value,
                    benefits: elEditFormBenefits.value.split(",")
                }
                products.splice(currentProductIndex, 1, product)
                productRender(products, elProductList)
            }
            elProductList.addEventListener("click", onListClick)
            elEditForm.removeEventListener('submit', editProduct) 
        }
    
        elEditForm.addEventListener('submit', editProduct)
    };
    elProductList.removeEventListener("click", onListClick)
}
if(elProductList) {
    elProductList.addEventListener("click", onListClick)
}

elFilterForm.addEventListener('submit', searchProduct)
productRender(products, elProductList)