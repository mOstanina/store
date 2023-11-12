import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this.product = []
        this.pageNumber = 1
        this.commonlCount = 0
        this.limitPages = 3
        makeAutoObservable(this)
    }

    setProduct(products) {
        this.product = products
    }

    setPage(page) {
        this.pageNumber = page
    }
    setTotalCount(count) {
        this.commonlCount = count
    }

    get products() {
        return this.product
    }

    get totalCount() {
        return this.commonlCount
    }
    get page() {
        return this.pageNumber
    }
    get limit() {
        return this.limitPages
    }
}