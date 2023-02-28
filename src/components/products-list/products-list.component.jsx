import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../firebase/firebase.util";
import SearchBox from "../search-box/search-box.component";

const UseProductsData = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const q = query(
        collection(db, "products-inventory"),
        where("itemPic", "!=", null)
      );
      const snapshot = await getDocs(q);
      const listProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      listProducts.sort((a, b) => a.itemsItemId - b.itemsItemId);
      setProductsData(listProducts);
    };
    getProducts();
  }, []);
  return [productsData, setProductsData];
};

const Filters = {
  NAME: "name",
  CODE: "itemNumber",
  CATEGORY: "category",
};

export default function ProductsList() {
  // eslint-disable-next-line
  const [products, setProducts] = UseProductsData();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchField, setSearchField] = useState(searchParams.get("q"));
  const [isSearchDisabled, setSearchDisabled] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(searchParams.get("f"));
  const history = useNavigate();

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setSearchParams(new URLSearchParams({ f: currentFilter, q: newQuery }));
  };

  const ShowFilterContent = (searchField) => {
    let filteredProducts = [];
    if (!searchField) return products;

    filteredProducts = products.filter(
      (product) =>
        product[currentFilter] &&
        product[currentFilter]
          .toLowerCase()
          .includes(searchField.toLocaleLowerCase())
    );
    return filteredProducts;
  };

  const onFilterSelection = (event) => {
    const selectedFilter = event.target.value;
    setSearchParams(new URLSearchParams({ f: selectedFilter, q: searchField }));
    setCurrentFilter(selectedFilter);
    setSearchDisabled(false);
  };

  const goToProductDetail = (id) => {
    history(`/producto?${new URLSearchParams({ id: id }).toString()}`);
  };

  return (
    <div style={{ padding: "2vw" }}>
      <div>
        <FormControl style={{ minWidth: 300, marginBottom: "1vh" }}>
          <InputLabel>Tipo(nombre o marca)</InputLabel>
          <Select
            onChange={onFilterSelection}
            value={currentFilter}
            variant="standard"
            color="error"
          >
            <MenuItem value={Filters.NAME}>Nombre</MenuItem>
            <MenuItem value={Filters.CATEGORY}>Marca</MenuItem>
          </Select>
        </FormControl>
        <SearchBox
          value={searchField}
          setParentInput={setSearchField}
          isDisabled={isSearchDisabled}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridGap: "15px",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {ShowFilterContent(searchField).map(
          ({ itemPic, name, unitPrice, category, id }) => {
            return (
              <Paper
                onClick={() => goToProductDetail(id)}
                style={{ borderRadius: "12px", cursor: "pointer" }}
              >
                <img
                  src={
                    itemPic !== null
                      ? itemPic
                      : "https://firebasestorage.googleapis.com/v0/b/ferremundo-6bfb3.appspot.com/o/pictures%2Fnot_available.png?alt=media&token=1700e622-60a2-46f9-8d79-25503b071de2"
                  }
                  alt=" "
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                />
                <div
                  style={{
                    marginBottom: "0.5em",
                    padding: "16px",
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h5
                    style={{
                      textTransform: "uppercase",
                      fontSize: "1.5em",
                      fontWeight: "bold",
                    }}
                  >
                    {name}
                  </h5>
                  <h6
                    style={{
                      textTransform: "uppercase",
                      fontSize: "1em",
                    }}
                  >
                    {category}
                  </h6>
                  <p style={{ color: "#777" }}>{unitPrice}</p>
                  <Button
                    style={{
                      backgroundColor: "#b53836",
                      borderRadius: "12px",
                    }}
                    variant="contained"
                  >
                    Agregar al Carrito
                  </Button>
                </div>
              </Paper>
            );
          }
        )}
      </div>
    </div>
  );
}
