import { https } from "../service/service.js";
import { renderProducts } from "./controller.js";
import { layThongtinTuForm, showData, toggleModal } from "./controller.js";
import { checkDuplicate, checkEmty } from "./validate.js";
import { lowSort } from "./priceSort.js";
let productsArr = [];

// fetchProducts in ra danh sách sản phẩm
let fetchProducts = () => {
  https
    .get("/products")
    .then(function (response) {
      productsArr = response.data;
      renderProducts(productsArr.reverse());
    })
    .catch(function (err) {
      console.log(err);
    });
};

console.log(productsArr);

// DeleteProd
let deleteProd = (id) => {
  console.log("delete", id);
  https
    .delete(`/products/${id}`)
    .then((response) => {
      console.log(response);
      fetchProducts();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deleteProd = deleteProd;

// ADD PRODUCT
window.addProd = () => {
  let prod = layThongtinTuForm();
  let {
    prodName,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type_phone,
  } = prod;
  // check Validate
  let isValid =
    checkEmty(prodName, "invalidTen") &&
    checkDuplicate(
      prodName,
      "invalidTen",
      productsArr,
      "This name this already exist!",
      "prodName"
    );
  // isValid false => return
  if (!isValid) {
    return;
  }

  // post method to add new product
  https
    .post("/products", prod)
    .then((response) => {
      console.log(response.data);
      fetchProducts();
    })
    .catch((error) => {
      console.log(error);
    });
};

// EDIT PRODUCT = SELECT PRODUCT + UPDATE PRODUCT
// init selectID to catch ID for update product
let selectedID = [];
window.editProd = (id) => {
  selectedID = id;

  //get method to get information from server
  https
    .get(`/products/${id}`)
    .then((response) => {
      toggleModal();
      let selectedProduct = response.data;
      showData(selectedProduct);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.updateProd = () => {
  let product = layThongtinTuForm();
  https
    // put method to update selectedID product
    .put(`/products/${selectedID}`, product)
    .then((response) => {
      toggleModal();
      fetchProducts();
    })
    .catch((err) => {
      console.log(err);
      toggleModal();
      alert("Product update failed!");
    });
};

// Sort function
window.sortFunc = () => {
  var selectBox = document.getElementById("pricingType");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if (selectedValue == "Low") {
    productsArr.sort((a, b) => a.price - b.price);
    renderProducts(productsArr);
  } else {
    productsArr.sort((a, b) => b.price - a.price);
    renderProducts(productsArr);
  }
};
fetchProducts();

window.searchName = () => {
  var inputSearch = document.getElementById("default-search").value;
  productsArr.forEach((product) => {
    if (product.prodName == inputSearch) {
      alert(`Found "${product.prodName}" product with name: ${inputSearch} !`);
    }
  });
};
