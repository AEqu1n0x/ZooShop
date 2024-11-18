import { makeAutoObservable } from "mobx";

export default class ItemStore {
  constructor() {
    this._types = []
    this._pets = []
    this._brands = []
    this._items = []
    this._selectedTypes = {}
    this._selectedPets = {}
    this._selectedBrand = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 8
    makeAutoObservable(this);
  }

  setSelectedType(type) {
    this._selectedTypes = type;
    this.SetPage(1)
  }

  setSelectedPet(pet) {
    this._selectedPets = pet
    this.SetPage(1)
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand
    this.SetPage(1)
  }

  setTypes(types) {
    this._types = types;
  }
  SetBrands(brands) {
    this._brands = brands;
  }
  SetPets(pets) {
    this._pets = pets;
  }
  SetItems(items) {
    this._items = items;
  }

  SetPage(page) {
    this._page = page;
  }

  SetTotalCount(count) {
    this._totalCount= count
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get pets() {
    return this._pets;
  }
  get items() {
    return this._items;
  }

  get SelectedType() {
    return this._selectedTypes
  }
  get SelectedPet() {
    return this._selectedPets
  }
  get SelectedBrand() {
    return this._selectedBrand
  }

  get totalCount() {
    return this._totalCount
  }

  get page(){
    return this._page
  }

  get limit() {
    return this._limit
  }
}
