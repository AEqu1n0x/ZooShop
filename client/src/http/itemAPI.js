import { $authHost, $host } from "./index";

export const createType = async (formData) => {
  const { data } = await $authHost.post("api/type", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const deleteType = async (id) => {
  await $authHost.delete("api/type", {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createBrand = async (formData) => {
  const { data } = await $authHost.post("api/brand", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchBrand = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const deleteBrand = async (id) => {
  await $authHost.delete("api/brand", {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createPet = async (formData) => {
  const { data } = await $authHost.post("api/pet", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchPet = async () => {
  const { data } = await $host.get("api/pet");
  return data;
};

export const deletePet = async (id) => {
  await $authHost.delete("api/pet", {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteItem = async (id) => {
  await $authHost.delete("api/item", {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createItem = async (item) => {
  const { data } = await $authHost.post("api/item", item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const fetchItem = async (itemTypeId, itemBrandId, itemPetId, limit = 8, page) => {
  const { data } = await $host.get("api/item", {
    params: {
      itemTypeId,
      itemBrandId,
      itemPetId,
      limit,
      page,
    },
  });
  return data;
};

export const fetchAllItems = async () => {
  const { data } = await $host.get("api/item", {
    params: {
      limit: 500,
      page: 1,
    },
  });
  return data;
};


export const fetchOneItem = async (id) => {
  const { data } = await $host.get("api/item/" + id);
  return data;
};

export const createRate = async (formData) => {
  const { data } = await $authHost.post("api/rating", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchRate = async (itemId) => {
  const { data } = await $host.get("api/rating", { params: { itemId } });
  return data;
};

export const addToBascket = async (formData) => {
  const { data } = await $authHost.post("api/bascket", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchBascket = async (userId) => {
  const { data } = await $host.get("api/bascket", {
    params: { userId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const deleteFromBascket = async (itemId) => {
  const { data } = await $host.delete("api/bascket/deleteItem", {
    data: { itemId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const addOrder = async (orderData) => {
  const { data } = await $host.post("api/order", orderData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};


export const fetchAllOrders = async () => {
  const { data } = await $authHost.get("api/order/getOrders");
  return data;
};
