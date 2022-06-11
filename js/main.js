const selectElement = (element, parentElement = document) => parentElement.querySelector(element)
const createDOM = (element) => document.createElement(element)
const elProductList = selectElement(".product-list")
const elProductTemplate = selectElement(".product-template").content
let elProductsCount = selectElement(".count").textContent = "count: " + products.length
let elProductName = selectElement("#product-title")
let elProductPrice = selectElement("#price")
let elProductManufacture = selectElement("#product-manufacturer")
let elBenefits = selectElement("#benefits")
let elAddProductForm = selectElement(".add-product-form")
let elManufacturesFilter = selectElement("#manufacturer")
let elProductSearch = selectElement("#search")
let elPriceFrom = selectElement("#from")
let elPriceTo = selectElement("#to")
let elSortBy = selectElement("#sortby")
let elFilterForm = selectElement("#search-form")

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
    });
    
}
function searchProduct(evt) {
    evt.preventDefault
    if(elSortBy.value === "1"){
        let regex = new RegExp(elProductSearch.value, 'gi')
        const searchedArr = products.filter(item => item.title.match(regex) || item.model === elManufacturesFilter.value)
        productRender(searchedArr, elProductList)
    }
    if(elSortBy.value === "2"){
        const filteredByPrice = products.filter(item => elPriceFrom < item.price > elPriceTo || item.model === elManufacturesFilter.value)
        productRender(filteredByPrice, elProductList)
    }
}

elFilterForm.addEventListener('submit', searchProduct)

productRender(products, elProductList)