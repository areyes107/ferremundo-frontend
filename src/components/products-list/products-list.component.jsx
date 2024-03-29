import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
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
      listProducts.sort((a, b) => {
        const nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
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
  const { addItemToCart } = useContext(CartContext);

  // eslint-disable-next-line
  const [products, setProducts] = UseProductsData();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchField, setSearchField] = useState(searchParams.get("q"));
  const [isSearchDisabled, setSearchDisabled] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(searchParams.get("f"));
  const history = useNavigate();

  const pageSize = 12;

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

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

  const addProductToCart = (product) => {
    addItemToCart(product);
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      count: ShowFilterContent(searchField).length,
    });
    // eslint-disable-next-line
  }, [ShowFilterContent(searchField)]);

  const handlePageChange = (event, page) => {
    window.scrollTo(0, 0);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({
      ...pagination,
      from: from,
      to: to,
    });
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
        {ShowFilterContent(searchField)
          .slice(pagination.from, pagination.to)
          .map(({ itemPic, name, unitPrice, category, id, itemNumber }) => {
            return (
              <Paper
                key={id}
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
                  onClick={() => goToProductDetail(id)}
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
                    onClick={() => goToProductDetail(id)}
                  >
                    {name}
                  </h5>
                  <h6
                    style={{
                      textTransform: "uppercase",
                      fontSize: "1em",
                    }}
                    onClick={() => goToProductDetail(id)}
                  >
                    {category}
                  </h6>
                  <p
                    onClick={() => goToProductDetail(id)}
                    style={{ color: "#777" }}
                  >
                    {unitPrice === "Q 0.00" ? "No Disponible" : unitPrice}
                  </p>
                  {unitPrice === "Q 0.00" ? (
                    <Button
                      sx={{
                        backgroundColor: "#b53836",
                        borderRadius: "12px",
                      }}
                      variant="contained"
                      disabled
                    >
                      Agregar al Carrito
                    </Button>
                  ) : (
                    <Button
                      style={{
                        backgroundColor: "#b53836",
                        borderRadius: "12px",
                      }}
                      variant="contained"
                      onClick={() =>
                        addProductToCart({
                          itemPic,
                          name,
                          category,
                          id,
                          unitPrice,
                          itemNumber,
                        })
                      }
                    >
                      Agregar al Carrito
                    </Button>
                  )}
                </div>
              </Paper>
            );
          })}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2vh",
        }}
      >
        <Pagination
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
}
